import { useGetNewTokenMutation } from '@/features/auth/model/auth.queries'
import { getAccessToken } from '@/shared/api/auth/auth.helper'
import {
	GRAPHQL_SERVER_URL,
	GRAPHQL_WS_SERVER_URL
} from '@/shared/const/constants'
import {
	ApolloClient,
	ApolloLink,
	FetchResult,
	GraphQLRequest,
	HttpLink,
	InMemoryCache,
	Observable,
	split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLError } from 'graphql'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

interface AccessToken {
	accessToken: string
}

// Проверка является ли операция запросом на обновление токена
const isRefreshRequest = (operation: GraphQLRequest) =>
	operation.operationName === 'getNewToken'

// Возвращение токена для операции
const returnToken = () => getAccessToken() || ''

// Установка контекста авторизации
const authLink = setContext((operation, { headers }) => {
	const token = returnToken()
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
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
									const { refreshAccessToken, data, error } =
										useGetNewTokenMutation()
									await refreshAccessToken()
									if (error || !data) {
										throw new GraphQLError('Failed to refresh token')
									}

									const newAccessToken = data.getNewToken.accessToken
									if (!newAccessToken) {
										throw new GraphQLError('Empty AccessToken')
									}

									operation.setContext(({ headers = {} }) => ({
										headers: {
											...headers,
											authorization: `Bearer ${newAccessToken}`
										}
									}))

									const subscriber = {
										next: observer.next.bind(observer),
										error: observer.error.bind(observer),
										complete: observer.complete.bind(observer)
									}

									forward(operation).subscribe(subscriber)
								} catch (err) {
									observer.error(err)
								}
							})()
						}
					)

					return observable
				}
			}
		}

		if (networkError) {
			console.error(`[Network error]: ${networkError}`)
		}
	}
)

// Настройка HTTP-ссылки
const httpLink = new HttpLink({
	uri: GRAPHQL_SERVER_URL,
	credentials: 'include'
})

export const wsLink = new GraphQLWsLink(
	createClient({
		url: GRAPHQL_WS_SERVER_URL,
		connectionParams: {
			authToken: getAccessToken()
		},
		retryAttempts: 5, // Добавьте повторные попытки подключения при ошибках
		on: {
			connected: () => console.log('WebSocket connected'),
			closed: () => console.log('WebSocket closed'),
			error: error => console.error('WebSocket error', error)
		}
	})
)

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
	httpLink
)

export const client = new ApolloClient({
	link: ApolloLink.from([authLink, errorLink, link]),
	cache: new InMemoryCache()
})

export default client
