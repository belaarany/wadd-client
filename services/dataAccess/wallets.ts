import { Wallet } from "../../interfaces/models/wallet"
import { databaseStrategy } from "../firebase/strategies/strategy"

export const getAll = async (): Promise<any> => {
	const result = await databaseStrategy.getAll("wallets")

	return result
}

export const create = async (data: Wallet): Promise<any> => {
	const result = await databaseStrategy.create("wallets", data)

	return result
}

export const update = async (id: string, data: Partial<Wallet>): Promise<any> => {
	const result = await databaseStrategy.update("wallets", id, data)
	return result
}

export const del = async (id: string): Promise<any> => {
	const result = await databaseStrategy.del("wallets", id)
	return result
}
