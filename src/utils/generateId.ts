export function generateId(prefix: string): string {
	let result = ""

	result += prefix
	result += "_"

	// result += (Date.now()).toString(16)

	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	const charactersLength = characters.length
	for (let i = 0; i < 20; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}

	return result
}
