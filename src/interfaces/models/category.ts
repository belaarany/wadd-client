export type Category = {
	readonly id: string
	readonly kind: string
	owner_user_id: string
	parent_category_id: string | null
	name: string
	color_hex: string
	icon_fa: string
	is_deleted: boolean
	is_archived: boolean
	created_at: string
	updated_at: string
	archived_at: string
	deleted_at: string
}
