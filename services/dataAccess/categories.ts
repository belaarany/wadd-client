import { Category } from "../../interfaces/models/category"
import { databaseStrategy } from "../firebase/strategies/strategy"

export const getAll = async (): Promise<any> => {
	const result = await databaseStrategy.getAll("categories")

	return result
}

export const create = async (data: Category): Promise<any> => {
	const result = await databaseStrategy.create("categories", data)

	return result
}

export const update = async (id: string, data: Partial<Category>): Promise<any> => {
	const result = await databaseStrategy.update("categories", id, data)
	return result
}

export const del = async (id: string): Promise<any> => {
	const result = await databaseStrategy.del("categories", id)
	return result
}
