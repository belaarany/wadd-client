import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { mapIncome, Transaction, transactionDataAccess } from "@wadd/models/transaction"
import { createEntityCRUD } from "@wadd/utils/entityCrud"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"

const adapter = createEntityAdapter<Transaction>()

const entityCrud = createEntityCRUD()

const initialState = adapter.getInitialState({
	...entityCrud.getInitialState(),
})

const thunks = entityCrud.getThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "transactions",
	dataAccess: transactionDataAccess,
})

export const slice = createSlice({
	name: "transactions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		entityCrud.getReducers(builder, adapter, thunks, {
			// createFulfilled: () => {
			// 	console.log("my custom one")

			// }
		})
	},
})

export const reducer = slice.reducer

export const selectors = {
	...adapter.getSelectors((state: any) => state.transactions),
}

export const actions = {
	...slice.actions,
	...thunks,
}
