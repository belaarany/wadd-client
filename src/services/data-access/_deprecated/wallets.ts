import { Wallet } from "../../../interfaces/models/wallet"
import { databaseStrategy } from "./_strategies"

export default () => {
	return {

	}
}

export const getAll = async (): Promise<any> => {
	try {
		const result = await databaseStrategy.getAll("wallets")
		return result
	} catch (e) {
		throw e
	}
}

export const create = async (data: Wallet): Promise<any> => {
	try {
		const result = await databaseStrategy.create("wallets", data)
		return result
	} catch (e) {
		throw e
	}
}

export const update = async (id: string, data: Partial<Wallet>): Promise<any> => {
	try {
		const result = await databaseStrategy.update("wallets", id, data)
		return result
	} catch (e) {
		throw e
	}
}

export const del = async (id: string): Promise<any> => {
	try {
		const result = await databaseStrategy.del("wallets", id)
		return result
	} catch (e) {
		throw e
	}
}
