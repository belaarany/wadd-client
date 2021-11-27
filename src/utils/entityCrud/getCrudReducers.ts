
export const getCRUDReducers = (builder, adapter, thunks) => {
	// Get All
	builder.addCase(thunks.getAll.fulfilled, adapter.addMany)

	// Create
	builder.addCase(thunks.create.pending, (state) => {
		state.api.status = "pending"
		state.api.operation = "create"
		state.api.error = null
	})
	builder.addCase(thunks.create.fulfilled, (state, { payload }) => {
		state.api.status = "idle"
		state.api.operation = null

		adapter.addOne(state, payload)
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
