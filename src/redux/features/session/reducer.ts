import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
	user: {},
}

export const slice = createSlice({
	name: "session",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<object>) => {
			state.user = action.payload
		},
	},
})

export const reducer = slice.reducer

export const selectors = {}

export const actions = {
	...slice.actions,
}
