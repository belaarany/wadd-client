import gql from "graphql-tag"

export const ExpensesGQLFragment = gql`
	fragment expenseFields on ExpenseGQLModel {
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
