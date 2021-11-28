import gql from "graphql-tag"

export const CategoriesGQLFragment = gql`
	fragment categoryFields on Category {
		id
		kind
		owner_user_id
		parent_category_id
		name
		color_hex
		icon_fa
		is_deleted
		created_at
		updated_at
		deleted_at
	}
`

export const CategoriesPartialGQLFragment = gql`
	fragment categoryPartialFields on Category {
		id
		kind
		parent_category_id
		name
	}
`
