import { SERVER_URL } from '@/shared/const/constants'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import authenticatedVar from './ authenticated'

const httpLink = new HttpLink({
	uri: `${SERVER_URL}/graphql`,
	credentials: 'same-origin',
})

const logoutLink = onError(({ graphQLErrors }) => {
	if (
		graphQLErrors?.length &&
		(graphQLErrors[0].extensions?.response as any)?.statusCode === 401
	) {
		authenticatedVar(false)
	}
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: logoutLink.concat(httpLink),
})

export default client
