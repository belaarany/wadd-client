import { Currency } from "@wadd/interfaces/enums/currency"

export type CreateEntityDto = {
	_type: "income" | "expense" | "transfer"

	timestamp?: string
	wallet_id?: string
	amount?: number
	currency?: Currency
	location?: string
	related_income_ids?: string[]
	related_expense_ids?: string[]
	note?: string
	category_id?: string
	tags?: string[]
	group_id?: string | null
	attachment_file_ids?: string[]

	source_wallet_id?: string
	source_amount?: number
	source_currency?: Currency
	target_wallet_id?: string
	target_amount?: number
	target_currency?: Currency
}

export type UpdateEntityDto = {
	_type: "income" | "expense" | "transfer"

	id: string
	timestamp?: string
	wallet_id?: string
	amount?: number
	currency?: Currency
	location?: string
	related_income_ids?: string[]
	related_expense_ids?: string[]
	note?: string
	category_id?: string
	tags?: string[]
	group_id?: string | null
	attachment_file_ids?: string[]

	source_wallet_id?: string
	source_amount?: number
	source_currency?: Currency
	target_wallet_id?: string
	target_amount?: number
	target_currency?: Currency
}
