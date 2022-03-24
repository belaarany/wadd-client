import { WalletsGQLFragment, Wallet, mapWallet } from "@wadd/models/wallet"
import { apolloclient } from "@wadd/services/apollo-graphql/client"
import { generateId } from "@wadd/utils/generateId"
import gql from "graphql-tag"
import { SavingsGoalsGQLFragment,SavingsGoal } from "@wadd/models/savings-goal"
import { mapSavingsGoal } from "./entity-mapper"

export const savingsGoalDataAccess = {
	getAll: (userId: string) => {
		return new Promise((resolve, reject) => {
			apolloclient
				.query({
					query: gql`
						query savingsGoals($query: SavingsGoalQueryInput) {
							savingsGoals(query: $query) {
								...savingsGoalFields
							}
						}

						${SavingsGoalsGQLFragment}
					`,
					variables: {
						query: {
							///owner_user_id: userId,
							is_deleted: false,
						},
					},
				})
				.then((result) => {
					resolve(result.data.savingsGoals)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	create: (userId: string, data: Partial<SavingsGoal>) => {
		return new Promise((resolve, reject) => {
			apolloclient
				.mutate({
					mutation: gql`
						mutation insertOneSavingsGoal($data: SavingsGoalInsertInput!) {
							insertOneSavingsGoal(data: $data) {
								...savingsGoalFields
							}
						}

						${SavingsGoalsGQLFragment}
					`,
					variables: {
						data: {
							...mapSavingsGoal(data),
							id: generateId("sgo"),
							owner_user_id: userId,
						},
					},
				})
				.then((result) => {
					resolve(result.data.insertOneSavingsGoal)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	update: (id: string, data: Partial<Wallet>) => {
		return new Promise((resolve, reject) => {
			apolloclient
				.mutate({
					mutation: gql`
						mutation updateOneWallet($query: WalletQueryInput, $set: WalletUpdateInput!) {
							updateOneWallet(query: $query, set: $set) {
								...walletFields
							}
						}

						${WalletsGQLFragment}
					`,
					variables: {
						query: {
							id: id,
						},
						set: {
							...data,
						},
					},
				})
				.then((result) => {
					resolve(result.data.updateOneWallet)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
}
