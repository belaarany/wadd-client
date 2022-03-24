import { Currency } from "@wadd/interfaces/enums/currency"
import { WalletType } from "@wadd/interfaces/enums/wallet-type"
import { SavingsGoal } from "."

export const mapSavingsGoal = (partialData: Partial<SavingsGoal>): SavingsGoal => {
	return {
		id: partialData.id,
		kind: "savings_goal",
		name: partialData.name,
		owner_user_id: partialData.owner_user_id,
		goal_amount: partialData.goal_amount || 0,
		start_amount: partialData.start_amount || 0,
		currency: partialData.currency || Currency.HUF,
		is_locked: partialData.is_locked || false,
		is_deleted: partialData.is_deleted || false,
		created_at: partialData.created_at || null,
		updated_at: partialData.updated_at || null,
		deleted_at: partialData.deleted_at || null,
	}
}
