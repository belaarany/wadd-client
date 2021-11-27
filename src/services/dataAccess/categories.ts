import { Category } from "../../interfaces/models/category"
import { Wallet } from "../../interfaces/models/wallet"
import { databaseStrategy } from "../firebase/strategies/strategy"

export const getAll = async (): Promise<any> => {
	try {
		const result = await databaseStrategy.getAll("categories")
		return result
	} catch (e) {
		throw e
	}
}

export const create = async (data: Category): Promise<any> => {
	try {
		const result = await databaseStrategy.create("categories", data)
		return result
	} catch (e) {
		throw e
	}
}

export const update = async (id: string, data: Partial<Category>): Promise<any> => {
	try {
		const result = await databaseStrategy.update("categories", id, data)
		return result
	} catch (e) {
		throw e
	}
}

export const del = async (id: string): Promise<any> => {
	try {
		const result = await databaseStrategy.del("categories", id)
		return result
	} catch (e) {
		throw e
	}
}
