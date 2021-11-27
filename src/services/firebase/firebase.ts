import { getDatabase, ref, onValue, child, get } from "firebase/database"
import { initializeApp } from "firebase/app"
import { realtimeDatabaseStrategy } from "./strategies/realtimeDatabase"

const firebaseConfig = {
	apiKey: "AIzaSyAY2Q2VZAuj461g8GMdC7ILxSVTGCkaJTY",
	authDomain: "finance-tracker-ed7f6.firebaseapp.com",
	databaseURL: "https://finance-tracker-ed7f6-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "finance-tracker-ed7f6",
	storageBucket: "finance-tracker-ed7f6.appspot.com",
	messagingSenderId: "110193977556",
	appId: "1:110193977556:web:b7355f112fbef169ed7341",
}

const app = initializeApp(firebaseConfig)

export const firebaseApp = app
