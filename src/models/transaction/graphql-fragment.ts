import gql from "graphql-tag"

export const IncomesGQLFragment = gql`
	fragment incomeFields on Income {
		id
		kind
		wallet_id
		amount
		currency
		timestamp
		location
		related_expense_ids
		note
		category_id
		tags
		group_id
		attachment_file_ids
		is_deleted
		is_cancelled
		created_at
		updated_at
		deleted_at
		cancelled_at
	}
`

export const ExpensesGQLFragment = gql`
	fragment expenseFields on Expense {
		id
		kind
		wallet_id
		amount
		currency
		timestamp
		location
		related_income_ids
		note
		category_id
		tags
		group_id
		attachment_file_ids
		is_deleted
		is_cancelled
		created_at
		updated_at
		deleted_at
		cancelled_at
	}
`

export const TransfersGQLFragment = gql`
	fragment transferFields on Transfer {
		id
		kind
		source_wallet_id
		source_amount
		source_currency
		target_wallet_id
		target_amount
		target_currency
		timestamp
		note
		is_deleted
		created_at
		updated_at
		deleted_at
	}
`
