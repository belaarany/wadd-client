import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SavingsGoal, savingsGoalDataAccess } from "@wadd/models/savings-goal"
import { createEntityCRUD } from "@wadd/utils/entityCrud"
import { CreateEntityDto, UpdateEntityDto } from "./interfaces"

const adapter = createEntityAdapter<SavingsGoal>()

const entityCrud = createEntityCRUD()

const initialState = adapter.getInitialState({
	...entityCrud.getInitialState(),
})

const thunks = entityCrud.getThunks<CreateEntityDto, UpdateEntityDto>({
	featureKey: "savingsGoals",
	dataAccess: savingsGoalDataAccess,
})

export const slice = createSlice({
	name: "savingsGoals",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		entityCrud.getReducers(builder, adapter, thunks)
	},
})

export const reducer = slice.reducer

export const selectors = {
	...adapter.getSelectors((state: any) => state.savingsGoals),
}

export const actions = {
	...slice.actions,
	...thunks,
}
