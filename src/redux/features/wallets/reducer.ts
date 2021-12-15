import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Wallet, walletDataAccess } from "@wadd/models/wallet"
import { createEntityCRUD } from "@wadd/utils/entityCrud"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"

const adapter = createEntityAdapter<Wallet>()

const entityCrud = createEntityCRUD()

const initialState = adapter.getInitialState({
	...entityCrud.getInitialState(),
	activeWalletId: null,
})

const thunks = entityCrud.getThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "wallets",
	dataAccess: walletDataAccess,
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
	activeWalletId: ((state) => state.wallets.activeWalletId)
}

export const actions = {
	...slice.actions,
	...thunks,
}
