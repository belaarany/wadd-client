export type CreateEntityDto = {
	owner_user_id: string
	parent_category_id: string | null
	name: string
	color_hex: string
	icon_fa: string
	type: string
}

export type UpdateEntityDto = {
	id: string
	parent_category_id?: string | null
	name?: string
	color_hex: string
	icon_fa: string
	type: string
}
