import { Button, Heading,Input } from "@chakra-ui/react"
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import { firebase } from "../services/firebase/firebase";

export default () => {
	// const db = getDatabase(firebase)
	// const dbRef = ref(getDatabase());
	// get(child(dbRef, `wdqw`)).then((snapshot) => {
	// 	if (snapshot.exists()) {
	// 		console.log(snapshot.val());
	// 	} else {
	// 		console.log("No data available");
	// 	}
	// }).catch((error) => {
	// 	console.error(error);
	// });
	return (
		<div>
			<Heading fontSize="lg" fontWeight="">Transaction</Heading >
			<Heading fontSize="md" fontWeight="">Transaction</Heading >
			<Button colorScheme="brand">Button</Button>
			<Input placeholder="Basic usage" colorScheme="brand" />
		</div>
	)
}
