import { Currency } from "@wadd/interfaces/enums/currency"
import { WalletType } from "@wadd/interfaces/enums/wallet-type"
import { Expense, Income } from "."

export const mapIncome = (partialData: Partial<Income>): Income => {
	return {
		id: partialData.id,
		kind: "income",
		wallet_id: partialData.wallet_id,
		amount: partialData.amount,
		currency: partialData.currency || Currency.HUF,
		timestamp: partialData.timestamp,
		location: partialData.location || "",
		related_expense_ids: partialData.related_expense_ids || [],
		note: partialData.note || "",
		category_id: partialData.category_id,
		tags: partialData.tags || [],
		group_id: partialData.group_id || null,
		attachment_file_ids: partialData.attachment_file_ids || [],
		is_cancelled: partialData.is_cancelled || false,
		is_deleted: partialData.is_deleted || false,
		created_at: partialData.created_at || null,
		updated_at: partialData.updated_at || null,
		cancelled_at: partialData.cancelled_at || null,
		deleted_at: partialData.deleted_at || null,
	}
}

export const mapExpense = (partialData: Partial<Expense>): Expense => {
	return {
		id: partialData.id,
		kind: "expense",
		wallet_id: partialData.wallet_id,
		amount: partialData.amount,
		currency: partialData.currency || Currency.HUF,
		timestamp: partialData.timestamp,
		location: partialData.location || "",
		related_income_ids: partialData.related_income_ids || [],
		note: partialData.note || "",
		category_id: partialData.category_id,
		tags: partialData.tags || [],
		group_id: partialData.group_id || null,
		attachment_file_ids: partialData.attachment_file_ids || [],
		is_cancelled: partialData.is_cancelled || false,
		is_deleted: partialData.is_deleted || false,
		created_at: partialData.created_at || null,
		updated_at: partialData.updated_at || null,
		cancelled_at: partialData.cancelled_at || null,
		deleted_at: partialData.deleted_at || null,
	}
}
