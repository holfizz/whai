import { useAuth } from '@/features/auth'
import { REFRESH_TOKEN } from '@/features/auth/model/auth.queries'
import { getAccessToken, saveTokenStorage } from '@/shared/api/auth/auth.helper'
import {
	ApolloClient,
	ApolloLink,
	FetchResult,
	GraphQLRequest,
	HttpLink,
	InMemoryCache,
	Observable,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { GraphQLError } from 'graphql'
function isRefreshRequest(operation: GraphQLRequest) {
	return operation.operationName === 'refreshToken'
}

function returnTokenDependingOnOperation(operation: GraphQLRequest) {
	if (isRefreshRequest(operation)) return getAccessToken() || ''
	else return getAccessToken() || ''
}

const authLink = setContext((operation, { headers }) => {
	let token = returnTokenDependingOnOperation(operation)
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (let err of graphQLErrors) {
				switch (err.extensions.code) {
					case 'UNAUTHENTICATED':
						if (operation.operationName === 'refreshToken') return

						const observable = new Observable<FetchResult<Record<string, any>>>(
							observer => {
								;(async () => {
									try {
										const accessToken = await refreshToken()
										if (!accessToken) {
											throw new GraphQLError('Empty AccessToken')
										}

										const subscriber = {
											next: observer.next.bind(observer),
											error: observer.error.bind(observer),
											complete: observer.complete.bind(observer),
										}

										forward(operation).subscribe(subscriber)
									} catch (err) {
										observer.error(err)
									}
								})()
							},
						)

						return observable
				}
			}
		}

		if (networkError) console.log(`[Network error]: ${networkError}`)
	},
)
interface AccessToken {
	accessToken: string
}

const httpLink = new HttpLink({
	uri: 'http://localhost:8800/api/graphql',
	credentials: 'include',
})
const wsLink = new WebSocketLink({
	uri: `ws://localhost:8800/api/graphql`,
	options: {
		reconnect: true,
	},
})
export const client = new ApolloClient({
	link: ApolloLink.from([authLink, errorLink, httpLink, wsLink]),
	cache: new InMemoryCache(),
})

const refreshToken = async () => {
	try {
		const refreshResolverResponse = await client.mutate<{
			getNewToken: AccessToken
		}>({
			mutation: REFRESH_TOKEN,
			variables: {
				offset: 0,
			},
		})

		const accessToken = refreshResolverResponse.data?.getNewToken.accessToken
		if (accessToken) {
			saveTokenStorage(accessToken)
		}
		return accessToken
	} catch (err) {
		const { setAuthUser, logout } = useAuth()
		logout()
		throw err
	}
}
export default client
