import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { walletsDataAccess } from "@wadd/services/data-access"
import { mapEntity } from "./entityMapper"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"
import { Wallet } from "@wadd/interfaces/models/wallet"
import { createEntityCRUD } from "@wadd/utils/entityCrud"

const adapter = createEntityAdapter<Wallet>()

const entityCrud = createEntityCRUD()

const initialState = adapter.getInitialState({
	...entityCrud.getInitialState(),
	activeWalletId: null,
})

const thunks = entityCrud.getThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "wallets",
	dataAccess: walletsDataAccess,
	entityMapper: mapEntity,
})

export const slice = createSlice({
	name: "wallets",
	initialState,
	reducers: {
		setActiveWalletId: (state, action: PayloadAction<string | null>) => {
			state.activeWalletId = action.payload
		},
	},
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
