'use client'
import client from '@/app/(providers)/ApolloProvider/ui/apollo-client'
import { removeFromStorage } from '@/shared/api/auth/auth.helper'
import { gql } from '@apollo/client'

export const PING = gql`
	query ping {
		ping
	}
`
export const LOGOUT = gql`
	query Logout {
		logout
	}
`

export const logout = () => {
	client.query({
		query: LOGOUT,
	})
	removeFromStorage()
}

export const ping = () => {
	client.query({
		query: PING,
	})
}
