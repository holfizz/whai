import { useGetNewTokenMutation } from '@/features/auth/model/auth.queries'
import { getAccessToken } from '@/shared/api/auth/auth.helper'
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
									const { refreshAccessToken, data, error } =
										useGetNewTokenMutation()
									refreshAccessToken()
									if (error || !data) {
										throw new GraphQLError('Failed to refresh token')
									}

									const newAccessToken = data.getNewToken.accessToken
									if (!newAccessToken) {
										throw new GraphQLError('Empty AccessToken')
									}

									// Обновляем заголовок авторизации
									operation.setContext(({ headers = {} }) => ({
										headers: {
											...headers,
											authorization: `Bearer ${newAccessToken}`,
										},
									}))

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

export default client
