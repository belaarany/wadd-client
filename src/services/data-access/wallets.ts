import gql from "graphql-tag"
import { Wallet } from "../../interfaces/models/wallet"
import { generateId } from "../../utils/generateId"
import { apolloclient } from "../apollo-graphql/client"
import { WalletsGQLFragment } from "./fragments/wallets.fragment"

export default {
	getAll: () => {
		return new Promise((resolve, reject) => {
			apolloclient
				.query({
					query: gql`
						query wallets($query: WalletQueryInput){
							wallets(query: $query) {
								...walletFields
							}
						}

						${WalletsGQLFragment}
					`,
					variables: {
						query: {
							is_deleted: false,
							is_archived: false,
						}
					}
				})
				.then((result) => {
					resolve(result.data.wallets)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	create: (data: Wallet) => {
		return new Promise((resolve, reject) => {
			apolloclient
				.mutate({
					mutation: gql`
						mutation insertOneWallet($data: WalletInsertInput!) {
							insertOneWallet(data: $data) {
								...walletFields
							}
						}

						${WalletsGQLFragment}
					`,
					variables: {
						data: {
							...data,
							id: generateId("wal"),
						}
					}
				})
				.then((result) => {
					resolve(result.data.insertOneWallet)
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
						}
					}
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
