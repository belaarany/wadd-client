import { WalletsGQLFragment, Wallet, mapWallet } from "@wadd/models/wallet"
import { apolloclient } from "@wadd/services/apollo-graphql/client"
import { generateId } from "@wadd/utils/generateId"
import gql from "graphql-tag"

export const walletDataAccess = {
	getAll: (userId: string) => {
		return new Promise((resolve, reject) => {
			apolloclient
				.query({
					query: gql`
						query wallets($query: WalletQueryInput) {
							wallets(query: $query) {
								...walletFields
							}
						}

						${WalletsGQLFragment}
					`,
					variables: {
						query: {
							owner_user_id: userId,
							is_deleted: false,
							is_archived: false,
						},
					},
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
	create: (userId: string, data: Partial<Wallet>) => {
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
							...mapWallet(data),
							id: generateId("wal"),
							owner_user_id: userId,
						},
					},
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
