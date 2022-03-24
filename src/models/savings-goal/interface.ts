import { Currency } from "@wadd/interfaces/enums/currency"

export type SavingsGoal = {
	readonly id: string
	readonly kind: "savings_goal"
	owner_user_id: string
	name: string
	start_amount: number
	goal_amount: number
	currency: Currency
	is_locked: boolean
	is_deleted: boolean
	created_at: string
	updated_at: string
	deleted_at: string
}
