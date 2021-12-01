import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"
import { createEntityCRUD } from "@wadd/utils/entityCrud"
import { Wallet, mapWallet, walletDataAccess } from "@wadd/models/wallet"

const adapter = createEntityAdapter<Wallet>()

const entityCrud = createEntityCRUD()

const initialState = adapter.getInitialState({
	...entityCrud.getInitialState(),
	activeWalletId: null,
})

const thunks = entityCrud.getThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "wallets",
	dataAccess: walletDataAccess,
	entityMapper: mapWallet,
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
