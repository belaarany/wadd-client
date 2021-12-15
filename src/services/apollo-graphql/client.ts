import { ApolloClient, HttpLink, InMemoryCache, NormalizedCache } from "@apollo/client"
import { getValidAccessToken } from "@wadd/services/mongodb-realm/connection"

export const apolloclient = new ApolloClient({
	link: new HttpLink({
		uri: process.env.NEXT_PUBLIC_MONGODB_GRAPHQL_ENDPOINT,
		fetch: async (uri, options) => {
			const accessToken = await getValidAccessToken()
			options.headers["Authorization"] = `Bearer ${accessToken}`
			return fetch(uri, options)
		},
	}),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "no-cache",
			errorPolicy: "ignore",
		},
		query: {
			fetchPolicy: "no-cache",
			errorPolicy: "all",
		},
	},
})
