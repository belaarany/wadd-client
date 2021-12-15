import { CategoriesGQLFragment, Category, mapCategory } from "@wadd/models/category"
import { apolloclient } from "@wadd/services/apollo-graphql/client"
import { generateId } from "@wadd/utils/generateId"
import gql from "graphql-tag"

export const categoryDataAccess = {
	getAll: (userId: string) => {
		return new Promise((resolve, reject) => {
			apolloclient
				.query({
					query: gql`
						query categories($query: CategoryQueryInput) {
							categories(query: $query) {
								...categoryFields
							}
						}

						${CategoriesGQLFragment}
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
					resolve(result.data.categories)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	create: (userId: string, data: Partial<Category>) => {
		return new Promise((resolve, reject) => {
			apolloclient
				.mutate({
					mutation: gql`
						mutation insertOneCategory($data: CategoryInsertInput!) {
							insertOneCategory(data: $data) {
								...categoryFields
							}
						}

						${CategoriesGQLFragment}
					`,
					variables: {
						data: {
							...mapCategory(data),
							id: generateId("cat"),
							owner_user_id: userId,
						},
					},
				})
				.then((result) => {
					resolve(result.data.insertOneCategory)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
	update: (id: string, data: Partial<Category>) => {
		return new Promise((resolve, reject) => {
			apolloclient
				.mutate({
					mutation: gql`
						mutation updateOneCategory($query: CategoryQueryInput, $set: CategoryUpdateInput!) {
							updateOneCategory(query: $query, set: $set) {
								...categoryFields
							}
						}

						${CategoriesGQLFragment}
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
					resolve(result.data.updateOneCategory)
				})
				.catch((error) => {
					console.log(error)
					reject(error)
				})
		})
	},
}
