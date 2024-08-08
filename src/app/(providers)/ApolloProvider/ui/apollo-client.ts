'use client'

import { logout } from '@/features/auth/model/auth.model'
import { GET_NEW_TOKEN } from '@/features/auth/model/auth.queries'
import { getAccessToken, saveTokenStorage } from '@/shared/api/auth/auth.helper'
import {
	GRAPHQL_SERVER_URL,
	GRAPHQL_WS_SERVER_URL
} from '@/shared/const/constants'
import {
	ApolloClient,
	ApolloLink,
	FetchResult,
	GraphQLRequest,
	InMemoryCache,
	Observable,
	split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { GraphQLError } from 'graphql'
import { createClient } from 'graphql-ws'

interface AccessToken {
	accessToken: string
}

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

// Функция для запроса нового токена
const refreshToken = async () => {
	try {
		const response = await client.query({
			query: GET_NEW_TOKEN,
			fetchPolicy: 'no-cache'
		})

		const newAccessToken = response.data?.getNewToken.accessToken
		if (!newAccessToken) {
			throw new GraphQLError('Empty AccessToken')
		}

		// Сохранение нового токена
		saveTokenStorage(newAccessToken)

		return newAccessToken
	} catch (err) {
		localStorage.clear()
		throw err
	}
}

// Обработка ошибок Apollo
const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				if (
					err.extensions?.code === 'UNAUTHENTICATED' &&
					!isRefreshRequest(operation)
				) {
					const observable = new Observable<FetchResult<Record<string, any>>>(
						observer => {
							;(async () => {
								try {
									const newAccessToken = await refreshToken()

									// Установка нового токена в заголовок
									operation.setContext(({ headers = {} }) => ({
										headers: {
											...headers,
											authorization: `Bearer ${newAccessToken}`
										}
									}))

									// Повторный запрос
									forward(operation).subscribe({
										next: observer.next.bind(observer),
										error: observer.error.bind(observer),
										complete: observer.complete.bind(observer)
									})
								} catch (err) {
									logout()
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
const uploadLink = new createUploadLink({
	uri: GRAPHQL_SERVER_URL,
	credentials: 'include',
	headers: {
		'apollo-require-preflight': true
	}
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
	uploadLink
)

export const client = new ApolloClient({
	link: ApolloLink.from([authLink, errorLink, link]),
	cache: new InMemoryCache(),
	connectToDevTools: true
})

export default client
