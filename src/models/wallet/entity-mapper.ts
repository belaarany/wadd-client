import { Currency } from "@wadd/interfaces/enums/currency"
import { WalletType } from "@wadd/interfaces/enums/wallet-type"
import { Wallet } from "./interface"

export const mapWallet = (partialData: Partial<Wallet>): Wallet => {
	return {
		id: partialData.id,
		kind: "wallet",
		name: partialData.name,
		order: partialData.order || 1,
		owner_user_id: partialData.owner_user_id,
		initial_balance: partialData.initial_balance || 0,
		default_currency: partialData.default_currency || Currency.HUF,
		type: partialData.type || WalletType.CASH,
		color_hex: partialData.color_hex || "000",
		icon_url: partialData.icon_url || "",
		is_deleted: partialData.is_deleted || false,
		is_archived: partialData.is_archived || false,
		created_at: partialData.created_at || null,
		updated_at: partialData.updated_at || null,
		deleted_at: partialData.deleted_at || null,
		archived_at: partialData.archived_at || null,
	}
}
