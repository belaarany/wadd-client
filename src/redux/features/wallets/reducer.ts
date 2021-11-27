import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Wallet } from "../../../interfaces/models/wallet"
import * as dataAccess from "../../../services/dataAccess"
import { createEntityCRUD } from "../../../utils/entityCrud/entityCrud"
import { mapEntity } from "./entityMapper"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"

const adapter = createEntityAdapter<Wallet>()

const entityCrud = createEntityCRUD()

const initialState = adapter.getInitialState({
	...entityCrud.getInitialState()
})

const thunks = entityCrud.getThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "wallets",
	dataAccess: dataAccess.wallets,
	entityMapper: mapEntity,
})

export const slice = createSlice({
	name: "wallets",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		entityCrud.getReducers(builder, adapter, thunks)
	},
})

export const reducer = slice.reducer

export const selectors = {
	...adapter.getSelectors((state: any) => state.wallets),
}

export const actions = {
	...slice.actions,
	...thunks,
}
