import { Currency } from "@wadd/interfaces/enums/currency"

export type Income = {
	readonly id: string
	readonly kind: "income"
	wallet_id: string
	amount: number
	currency: Currency
	timestamp: string
	location: string
	related_expense_ids: string[]
	note: string
	category_id: string
	tags: string[]
	group_id: string | null
	attachment_file_ids: string[]
	is_deleted: boolean
	is_cancelled: boolean
	created_at: string
	updated_at: string
	deleted_at: string
	cancelled_at: string

	// wallet?: {
	// 	kind: "wallet"
	// 	id: string
	// 	name: string
	// }

	// category?: {
	// 	kind: "category"
	// 	id: string
	// 	parent_category_id: string | null
	// 	name: string
	// }
}

export type Expense = {
	readonly id: string
	readonly kind: "expense"
	wallet_id: string
	amount: number
	currency: Currency
	timestamp: string
	location: string
	related_income_ids: string[]
	note: string
	category_id: string
	tags: string[]
	group_id: string | null
	attachment_file_ids: string[]
	is_deleted: boolean
	is_cancelled: boolean
	created_at: string
	updated_at: string
	deleted_at: string
	cancelled_at: string

	// wallet?: {
	// 	kind: "wallet"
	// 	id: string
	// 	name: string
	// }

	// category?: {
	// 	kind: "category"
	// 	id: string
	// 	parent_category_id: string | null
	// 	name: string
	// }
}

export type Transfer = {
	readonly id: string
	readonly kind: "transfer"
	source_wallet_id: string
	source_amount: number
	source_currency: Currency
	target_wallet_id: string
	target_amount: number
	target_currency: Currency
	timestamp: string
	note: string
	is_deleted: boolean
	created_at: string
	updated_at: string
	deleted_at: string

	// source_wallet?: {
	// 	kind: "wallet"
	// 	id: string
	// 	name: string
	// }

	// target_wallet?: {
	// 	kind: "wallet"
	// 	id: string
	// 	name: string
	// }
}

export type Transaction = Income | Expense | Transfer
