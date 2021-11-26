import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Category } from "../../../interfaces/models/category"
import * as dataAccess from "../../../services/dataAccess"
import { updateOne } from "../../../utils/adapterUpdateOne"
import { getCRUDAsyncThunks } from "../../../utils/getCrudAsyncThunks"
import { mapEntity } from "./entityMapper"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"

const thunks = getCRUDAsyncThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "categories",
	dataAccess: dataAccess.categories,
	entityMapper: mapEntity,
})

const adapter = createEntityAdapter<Category>()

const initialState = adapter.getInitialState({})

export const slice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(thunks.getAll.fulfilled, adapter.addMany)
		builder.addCase(thunks.create.fulfilled, adapter.addOne)
		builder.addCase(thunks.update.fulfilled, updateOne(adapter))
		builder.addCase(thunks.delete.fulfilled, adapter.removeOne)
	},
})

export const reducer = slice.reducer

export const selectors = {
	...adapter.getSelectors((state: any) => state.categories),
}

export const actions = {
	...slice.actions,
	...thunks,
}
