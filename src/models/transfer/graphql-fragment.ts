import gql from "graphql-tag"

export const TransfersGQLFragment = gql`
	fragment transferFields on TransferGQLModel {
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
