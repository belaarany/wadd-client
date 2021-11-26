import { createAsyncThunk } from "@reduxjs/toolkit"

export const getCRUDAsyncThunks = <CreateEntityDtoT, UpdateEntityDtoT extends { id: string }>({featureKey, dataAccess, entityMapper}) => {
	return {
		getAll: createAsyncThunk(`${featureKey}/getAll`, async () => {
			const result = await dataAccess.getAll()
			return result
		}),
		create: createAsyncThunk(`${featureKey}/create`, async (data: CreateEntityDtoT) => {
			const mappedEntity = entityMapper(data)

			mappedEntity.created_at = new Date().toISOString()

			const result = await dataAccess.create(mappedEntity)

			return result
		}),
		update: createAsyncThunk(`${featureKey}/update`, async (data: UpdateEntityDtoT) => {
			data["updated_at"] = new Date().toISOString()

			const result = await dataAccess.update(data?.id, data)

			return result
		}),
		delete: createAsyncThunk(`${featureKey}/delete`, async (id: string) => {
			await dataAccess.del(id)

			return id
		}),
	}
}
