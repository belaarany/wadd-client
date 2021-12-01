import { ApolloClient, HttpLink, InMemoryCache, NormalizedCache } from "@apollo/client"
import { getValidAccessToken } from "@wadd/services/mongodb-realm/connection"

export const apolloclient = new ApolloClient({
	link: new HttpLink({
		uri: `https://realm.mongodb.com/api/client/v2.0/app/application-0-awlwg/graphql`,
		fetch: async (uri, options) => {
			const accessToken = await getValidAccessToken()
			options.headers["Authorization"] = `Bearer ${accessToken}`
			return fetch(uri, options)
		},
	}),
	cache: new InMemoryCache(),
})
