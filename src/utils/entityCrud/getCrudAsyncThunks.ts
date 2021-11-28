import { createAsyncThunk } from "@reduxjs/toolkit"

export const getCRUDAsyncThunks = <CreateEntityDtoT, UpdateEntityDtoT extends { id: string }>({featureKey, dataAccess, entityMapper}) => {
	return {
		getAll: createAsyncThunk(`${featureKey}/getAll`, async () => {
			const result = await dataAccess.getAll()
			return result
		}),
		create: createAsyncThunk(`${featureKey}/create`, async (data: CreateEntityDtoT) => {
			const result = await dataAccess.create({
				...entityMapper(data),
				created_at: new Date().toISOString()
			})
			return result
		}),
		update: createAsyncThunk(`${featureKey}/update`, async (data: UpdateEntityDtoT) => {
			const result = await dataAccess.update(data?.id, {
				...data,
				updated_at: new Date().toISOString()
			})
			return result
		}),
		delete: createAsyncThunk(`${featureKey}/delete`, async (id: string) => {
			await dataAccess.update(id, {
				is_deleted: true,
				deleted_at: new Date().toISOString(),
			})
			return id
		}),
	}
}
