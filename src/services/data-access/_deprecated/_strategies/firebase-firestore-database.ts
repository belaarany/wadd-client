import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import { firebaseApp } from "../../../firebase"

const firestoreDatabase = getFirestore(firebaseApp)

const getAll = async (collectionKey: string) => {
	const docs = await getDocs(collection(firestoreDatabase, collectionKey))

	return docs.docs.map((doc) => doc.data())
}

const create = async (collectionKey: string, data: any) => {
	const newItemRef = await doc(collection(firestoreDatabase, collectionKey))
	const newItem = {
		...data,
		id: newItemRef.id,
	}

	await setDoc(newItemRef, newItem)

	return newItem
}

export const firestoreDatabaseStrategy = {
	getAll,
	create,
}
