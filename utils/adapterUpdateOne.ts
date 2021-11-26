export const updateOne =
	(adapter) =>
	(state, { payload }) => {
		const { id, ...changes } = payload
		adapter.updateOne(state, { id, changes })
	}
