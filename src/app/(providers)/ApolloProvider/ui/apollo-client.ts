import { REFRESH_TOKEN } from '@/features/auth/model/auth.queries'
import { getAccessToken, saveTokenStorage } from '@/shared/api/auth/auth.helper'
import {
	GRAPHQL_SERVER_URL,
	GRAPHQL_WS_SERVER_URL,
} from '@/shared/const/constants'
import {
	ApolloClient,
	ApolloLink,
	FetchResult,
	GraphQLRequest,
	HttpLink,
	InMemoryCache,
	Observable,
	split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLError } from 'graphql'
import Cookies from 'js-cookie'
interface AccessToken {
	accessToken: string
}
// Проверка является ли операция запросом на обновление токена
const isRefreshRequest = (operation: GraphQLRequest) =>
	operation.operationName === 'refreshToken'

// Возвращение токена для операции
const returnToken = () => getAccessToken() || ''

// Установка контекста авторизации
const authLink = setContext((operation, { headers }) => {
	const token = returnToken()
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

// Обработка ошибок Apollo
const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				if (
					err.extensions.code === 'UNAUTHENTICATED' &&
					!isRefreshRequest(operation)
				) {
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

		if (networkError) {
			console.error(`[Network error]: ${networkError}`)
		}
	},
)

// Настройка HTTP-ссылки
const httpLink = new HttpLink({
	uri: GRAPHQL_SERVER_URL,
	credentials: 'include',
})

// Настройка WebSocket-ссылки
const wsLink = new WebSocketLink({
	uri: GRAPHQL_WS_SERVER_URL,
	options: {
		reconnect: true,
		connectionParams: {
			authToken: getAccessToken(),
		},
	},
})

// Разделение ссылок для подписок и других запросов
const link = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	httpLink,
)

// Создание Apollo клиента
export const client = new ApolloClient({
	link: ApolloLink.from([authLink, errorLink, link]),
	cache: new InMemoryCache(),
})

// Функция для обновления токена
const refreshToken = async () => {
	try {
		const refreshToken = Cookies.get('refreshToken')
		const refreshResolverResponse = await client.mutate<{
			getNewToken: AccessToken
		}>({
			mutation: REFRESH_TOKEN,
			variables: { refreshToken },
		})

		const accessToken =
			refreshResolverResponse.data?.getNewToken.accessToken || null
		if (accessToken) {
			saveTokenStorage(accessToken)
		}
		return accessToken
	} catch (err) {
		console.error('Error refreshing token:', err)
		throw err
	}
}

export default client
