
export const getCRUDReducers = (builder, adapter, thunks, customResolvers: any = {}) => {
	// Get All
	builder.addCase(thunks.getAll.pending, (state) => {
		state.api.status = "pending"
		state.api.operation = "getAll"
		state.api.error = null
	})
	builder.addCase(thunks.getAll.fulfilled, (state, { payload }) => {
		state.api.status = "idle"
		state.api.operation = null

		adapter.setAll(state, payload)
	})
	builder.addCase(thunks.getAll.rejected, (state, { error }) => {
		state.api.status = "idle"
		state.api.operation = null
		state.api.error = error
	})

	// Create
	builder.addCase(thunks.create.pending, (state) => {
		state.api.status = "pending"
		state.api.operation = "create"
		state.api.error = null
	})
	builder.addCase(thunks.create.fulfilled, (state, { payload }) => {
		state.api.status = "idle"
		state.api.operation = null

		customResolvers.createFulfilled ? customResolvers.createFulfilled() : adapter.addOne(state, payload)
	})
	builder.addCase(thunks.create.rejected, (state, { error }) => {
		state.api.status = "idle"
		state.api.operation = null
		state.api.error = error
	})

	// Update
	builder.addCase(thunks.update.pending, (state) => {
		state.api.status = "pending"
		state.api.operation = "update"
		state.api.error = null
	})
	builder.addCase(thunks.update.fulfilled, (state, { payload }) => {
		state.api.status = "idle"
		state.api.operation = null

		const { id, ...changes } = payload
		adapter.updateOne(state, { id, changes })
	})
	builder.addCase(thunks.update.rejected, (state, { error }) => {
		state.api.status = "idle"
		state.api.operation = null
		state.api.error = error
	})

	// Delete
	builder.addCase(thunks.delete.fulfilled, adapter.removeOne)
}
