import { Category } from "../../../interfaces/models/category"

export const mapEntity = (partialData: Partial<Category>): Category => {
	return {
		id: partialData.id,
		kind: "category",
		type: partialData.type,
		owner_user_id: partialData.owner_user_id,
		parent_category_id: partialData.parent_category_id,
		name: partialData.name,
		color_hex: partialData.color_hex,
		icon_fa: partialData.icon_fa,
		is_deleted: partialData.is_deleted || false,
		is_archived: partialData.is_archived || false,
		created_at: partialData.created_at || null,
		updated_at: partialData.updated_at || null,
		archived_at: partialData.archived_at || null,
		deleted_at: partialData.deleted_at || null,
	}
}
