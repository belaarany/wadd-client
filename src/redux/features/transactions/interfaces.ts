import { Currency } from "@wadd/interfaces/enums/currency"

export type CreateEntityDto = {
	_type: "income" | "expense" | "transfer"
	timestamp: string

	wallet_id: string
	amount: number
	currency: Currency
	location?: string
	related_income_ids?: string[]
	related_expense_ids?: string[]
	note?: string
	category_id: string
	tags?: string[]
	group_id?: string | null
	attachment_file_ids?: string[]
}

export type UpdateEntityDto = {
	id: string
	// id: string
	// parent_category_id?: string | null
	// name?: string
	// color_hex: string
	// icon_fa: string
	// type: string
}
