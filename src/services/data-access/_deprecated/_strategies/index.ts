import { firestoreDatabaseStrategy } from "./firebase-firestore-database"
import * as realtimeDatabaseStrategy from "./firebase-realtime-database"

export const databaseStrategy = realtimeDatabaseStrategy
// export const databaseStrategy = firestoreDatabaseStrategy
