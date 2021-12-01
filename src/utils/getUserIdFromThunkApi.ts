export const getUserIdFromThunkApi = (thunkAPI) => {
	return thunkAPI.getState()?.session?.user?.sub || null
}
