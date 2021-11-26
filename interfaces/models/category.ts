export type Category = {
	readonly id: string
	readonly kind: string
	owner_user_id: string
	parent_category_id: string | null
	name: string
	is_deleted: boolean
	created_at: string
	updated_at: string
	deleted_at: string
}
