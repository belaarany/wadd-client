import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { sessionStore, walletsStore, categoriesStore } from "./features/index"

export const store = configureStore({
	reducer: {
		session: sessionStore.reducer,
		wallets: walletsStore.reducer,
		categories: categoriesStore.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
