import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Category } from "../../../interfaces/models/category"
import * as dataAccess from "../../../services/data-access"
import { createEntityCRUD } from "../../../utils/entityCrud/entityCrud"
import { mapEntity } from "./entityMapper"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"
import { categoriesDataAccess } from "../../../services/data-access"

const adapter = createEntityAdapter<Category>()

const entityCrud = createEntityCRUD()

const initialState = adapter.getInitialState({
	...entityCrud.getInitialState(),
})

const thunks = entityCrud.getThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "categories",
	dataAccess: categoriesDataAccess,
	entityMapper: mapEntity,
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
