import gql from "graphql-tag"

export const IncomesGQLFragment = gql`
	fragment incomeFields on IncomeGQLModel {
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
