import { getCRUDAsyncThunks } from "./getCrudAsyncThunks"
import { getCRUDInitialState } from "./getCrudInitialState"
import { getCRUDReducers } from "./getCrudReducers"

export const createEntityCRUD = () => {
	return {
		getInitialState: getCRUDInitialState,
		getReducers: getCRUDReducers,
		getThunks: getCRUDAsyncThunks
	}
}
