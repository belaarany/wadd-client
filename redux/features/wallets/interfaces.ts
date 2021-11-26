import { Currency } from "../../../interfaces/enums/currency"
import { WalletType } from "../../../interfaces/enums/wallet-type"

export interface FeatureState {
	value: number
}

export type CreateEntityDto = {
	name: string
	order: number
	owner_user_id: string
	initial_balance: number
	default_currency: Currency
	type: WalletType
	color_hex: string
	icon_url: string
}

export type UpdateEntityDto = {
	id: string
	name?: string
	order?: number
	owner_user_id?: string
	initial_balance?: number
	default_currency?: Currency
	type?: WalletType
	color_hex?: string
	icon_url?: string
}
