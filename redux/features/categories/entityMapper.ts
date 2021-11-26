import { Category } from "../../../interfaces/models/category"

export const mapEntity = (partialData: Partial<Category>): Category => {
	return {
		id: partialData.id,
		kind: "category",
		owner_user_id: partialData.owner_user_id,
		parent_category_id: partialData.parent_category_id,
		name: partialData.name,
		is_deleted: partialData.is_deleted || false,
		created_at: partialData.created_at || null,
		updated_at: partialData.updated_at || null,
		deleted_at: partialData.deleted_at || null,
	}
}
