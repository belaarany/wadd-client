import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { reducer as walletsReducer } from "./features/wallets"
import { reducer as categoriesReducer } from "./features/categories"

export const store = configureStore({
	reducer: {
		wallets: walletsReducer,
		categories: categoriesReducer,
	},
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
