import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"
import { Category, mapCategory } from "@wadd/models/category"
import { categoryDataAccess } from "@wadd/models/category/data-access"
import { createEntityCRUD } from "@wadd/utils/entityCrud"

const adapter = createEntityAdapter<Category>()

const entityCrud = createEntityCRUD()

const initialState = adapter.getInitialState({
	...entityCrud.getInitialState(),
})

const thunks = entityCrud.getThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "categories",
	dataAccess: categoryDataAccess,
	entityMapper: mapCategory,
})

export const slice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		entityCrud.getReducers(builder, adapter, thunks)
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
