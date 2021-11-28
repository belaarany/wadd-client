import { Currency } from "../../../interfaces/enums/currency"
import { WalletType } from "../../../interfaces/enums/wallet-type"

export interface FeatureState {
	value: number
}

export type CreateEntityDto = {
	owner_user_id: string
	parent_category_id: string | null
	name: string
	color_hex: string
	icon_fa: string
}

export type UpdateEntityDto = {
	id: string
	parent_category_id?: string | null
	name?: string
	color_hex: string
	icon_fa: string
}
