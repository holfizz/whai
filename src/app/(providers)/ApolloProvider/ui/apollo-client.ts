import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		)
	if (networkError) console.error(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
	uri: 'http://localhost:8800/api/graphql',
	credentials: 'include',
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: ApolloLink.from([errorLink, httpLink]),
	connectToDevTools: true,
})

export default client
