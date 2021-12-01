import gql from "graphql-tag"

export const WalletsGQLFragment = gql`
	fragment walletFields on Wallet {
		id
		kind
		name
		order
		owner_user_id
		initial_balance
		default_currency
		type
		color_hex
		icon_url
		is_deleted
		is_archived
		created_at
		updated_at
		deleted_at
		archived_at
	}
`

export const WalletsPartialGQLFragment = gql`
	fragment walletPartialFields on Wallet {
		id
		kind
		name
	}
`
