import { getDatabase, child, get, push, ref, set, update as upd } from "firebase/database"
import { firebaseApp } from ".."

const realtimeDatabase = getDatabase(firebaseApp)
const realtimeDatabaseRef = ref(getDatabase(firebaseApp))

export const getAll = async (collection: string) => {
	try {
		const result = await get(child(realtimeDatabaseRef, collection))

		return result.val() || []
	} catch (e) {
		console.log(e)
	}
}

export const create = async (collection: string, data: any) => {
	try {
		const listRef = ref(realtimeDatabase, collection)
		const newItemRef = push(listRef)
		const newItem = {
			...data,
			id: newItemRef.key,
		}

		await set(newItemRef, newItem)

		return newItem
	} catch (e) {
		console.log(e)
	}
}

export const update = async (collection: string, key: string, data: any) => {
	try {
		const itemRef = ref(realtimeDatabase, `${collection}/${key}`)

		await upd(itemRef, data)

		return data
	} catch (e) {
		console.log(e)
	}
}

export const del = async (collection: string, key: string) => {
	try {
		const itemRef = ref(realtimeDatabase, `${collection}/${key}`)

		await set(itemRef, null)

		return null
	} catch (e) {
		console.log(e)
	}
}
