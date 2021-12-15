import { WalletsGQLFragment } from "@wadd/models/wallet"
import { apolloclient } from "@wadd/services/apollo-graphql/client"
import { generateId } from "@wadd/utils/generateId"
import gql from "graphql-tag"
import { Expense, ExpensesGQLFragment, Income, IncomesGQLFragment, mapExpense, mapIncome, Transaction } from "."
import _ from "lodash"

export const transactionDataAccess = {
	getAll: (userId: string, filter: any) => {
		return new Promise((resolve, reject) => {
			const walletIdQuery = {}
			console.log(filter)
			apolloclient
				.query({
					query: gql`
						query transactions($wallet_id_in: [String]) {
							incomes(query: {
								wallet_id_in: $wallet_id_in
							}) {
								...incomeFields
							}

							expenses(query: {
								wallet_id_in: $wallet_id_in
							}) {
								...expenseFields
							}
						}

						${IncomesGQLFragment}
						${ExpensesGQLFragment}
					`,
					variables: {
						wallet_id_in: filter.selectedWalletIds,
					},
				})
				.then((result) => {
					resolve([...result.data.incomes, ...result.data.expenses])
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	create: (userId: string, data: Partial<Transaction> & { _type: "income" | "expense" | "transfer" }) => {
		console.log(data)
		return new Promise((resolve, reject) => {
			const insertOneIncome = gql`
				mutation insertOneTranaction($data: IncomeInsertInput!) {
					insertOneTranaction: insertOneIncome(data: $data) {
						...incomeFields
					}
				}

				${IncomesGQLFragment}
			`
			const insertOneExpense = gql`
				mutation insertOneTranaction($data: ExpenseInsertInput!) {
					insertOneTranaction: insertOneExpense(data: $data) {
						...expenseFields
					}
				}

				${ExpensesGQLFragment}
			`

			apolloclient
				.mutate({
					mutation: data._type === "income" ? insertOneIncome : insertOneExpense,
					variables: {
						data: {
							...(data._type === "income" && mapIncome(data as Income)),
							...(data._type === "expense" && mapExpense(data as Expense)),
							id: generateId("inc"),
						},
					},
				})
				.then((result) => {
					resolve(result.data.insertOneTranaction)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	update: (id: string, data: Partial<Transaction> & { _type: "income" | "expense" | "transfer" }) => {
		return new Promise((resolve, reject) => {
			const updateOneIncome = gql`
				mutation updateOneTranaction($query: IncomeQueryInput, $set: IncomeUpdateInput!) {
					updateOneTranaction: updateOneIncome(query: $query, set: $set) {
						...incomeFields
					}
				}

				${IncomesGQLFragment}
			`
			const updateOneExpense = gql`
				mutation updateOneTranaction($query: ExpenseQueryInput, $set: ExpenseUpdateInput!) {
					updateOneTranaction: updateOneExpense(query: $query, set: $set) {
						...expenseFields
					}
				}

				${ExpensesGQLFragment}
			`

			apolloclient
				.mutate({
					mutation: data._type === "income" ? updateOneIncome : updateOneExpense,
					variables: {
						query: {
							id: data.id,
						},
						set: {
							// ...(data._type === "income" && mapIncome(data as Income)),
							// ...(data._type === "expense" && mapExpense(data as Expense)),
							// id: generateId("inc"),
							..._.omit(data, ["id", "kind", "_type"]),
						},
					},
				})
				.then((result) => {
					resolve(result.data.updateOneTranaction)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
}
