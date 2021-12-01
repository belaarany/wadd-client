import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserIdFromThunkApi } from "@wadd/utils/getUserIdFromThunkApi"

export const getCRUDAsyncThunks = <CreateEntityDtoT, UpdateEntityDtoT extends { id: string }>({featureKey, dataAccess, entityMapper}) => {
	return {
		getAll: createAsyncThunk(`${featureKey}/getAll`, async (data: never, thunkAPI) => {
			const result = await dataAccess.getAll(getUserIdFromThunkApi(thunkAPI))
			return result
		}),
		create: createAsyncThunk(`${featureKey}/create`, async (data: CreateEntityDtoT, thunkAPI) => {
			const result = await dataAccess.create(getUserIdFromThunkApi(thunkAPI), {
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
