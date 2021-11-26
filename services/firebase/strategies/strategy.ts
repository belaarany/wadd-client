import { firestoreDatabaseStrategy } from "./firestoreDatabase"
import * as realtimeDatabaseStrategy from "./realtimeDatabase"

export const databaseStrategy = realtimeDatabaseStrategy
// export const databaseStrategy = firestoreDatabaseStrategy
