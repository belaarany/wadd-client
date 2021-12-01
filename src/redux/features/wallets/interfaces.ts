import { Currency } from "@wadd/interfaces/enums/currency"
import { WalletType } from "@wadd/interfaces/enums/wallet-type"

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
