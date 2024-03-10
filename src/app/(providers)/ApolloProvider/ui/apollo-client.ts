import { useAuth } from '@/features/auth'
import { useGetUserMutation } from '@/features/auth/model/auth.queries'
import { EnumTokens } from '@/shared/types/auth'
import {
	ApolloClient,
	ApolloLink,
	FetchResult,
	HttpLink,
	InMemoryCache,
	Observable,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import { CookieService } from './cookie.service'
const authLink = setContext((_, { headers }) => {
	const accessToken = CookieService.getAccessToken()

	return {
		headers: {
			...headers,
			authorization: accessToken ? `Bearer ${accessToken}` : '',
		},
	}
})
const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				switch (err.extensions.code) {
					case 'UNAUTHENTICATED':
						if (operation.operationName === EnumTokens.REFRESH_TOKEN) return

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
const refreshToken = async () => {
	const { setAccessToken, setAuthUser } = useAuth()

	try {
		const refreshToken = CookieService.getRefreshToken()

		const [getUser, { data }] = useGetUserMutation()
		if (refreshToken) {
			getUser({
				variables: {
					input: { refreshToken },
				},
			})
		}

		if (data?.getNewTokens.accessToken) {
			CookieService.setAccessToken(data?.getNewTokens.accessToken)
			setAccessToken(data?.getNewTokens.accessToken)
		}

		return data?.getNewTokens.accessToken
	} catch (err) {
		setAuthUser(null)
		CookieService.removeAccessToken()
		throw err
	}
}
