import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Wallet } from "../../../interfaces/models/wallet"
import * as dataAccess from "../../../services/dataAccess"
import { updateOne } from "../../../utils/adapterUpdateOne"
import { getCRUDAsyncThunks } from "../../../utils/getCrudAsyncThunks"
import { mapEntity } from "./entityMapper"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"

const thunks = getCRUDAsyncThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "wallets",
	dataAccess: dataAccess.wallets,
	entityMapper: mapEntity,
})

const adapter = createEntityAdapter<Wallet>()

const initialState = adapter.getInitialState({})

export const slice = createSlice({
	name: "wallets",
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
	...adapter.getSelectors((state: any) => state.wallets),
}

export const actions = {
	...slice.actions,
	...thunks,
}
