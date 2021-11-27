import { Currency } from "../enums/currency";
import { WalletType } from "../enums/wallet-type";

export type Wallet = {
	readonly id: string
	readonly kind: "wallet"
	name: string
	order: number
	owner_user_id: string
	initial_balance: number
	default_currency: Currency
	type: WalletType
	color_hex: string
	icon_url: string
	is_deleted: boolean
	is_archived: boolean
	created_at: string
	updated_at: string
	deleted_at: string
	archived_at: string
}
