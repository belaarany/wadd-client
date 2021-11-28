import gql from "graphql-tag"
import { Category } from "../../interfaces/models/category"
import { generateId } from "../../utils/generateId"
import { apolloclient } from "../apollo-graphql/client"
import { CategoriesGQLFragment } from "./fragments/categories.fragment"

export default {
	getAll: () => {
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
	create: (data: Category) => {
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
							...data,
							id: generateId("cat"),
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
