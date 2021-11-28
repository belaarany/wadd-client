import * as Realm from "realm-web"

export const realmApp = new Realm.App(process.env.NEXT_PUBLIC_MONGODB_REALM_APP_ID)

export const getValidAccessToken = async () => {
	if (!realmApp.currentUser) {
		await realmApp.logIn(Realm.Credentials.apiKey(process.env.NEXT_PUBLIC_MONGODB_REALM_API_KEY))
	} else {
		await realmApp.currentUser.refreshCustomData()
	}

	return realmApp.currentUser.accessToken
}
