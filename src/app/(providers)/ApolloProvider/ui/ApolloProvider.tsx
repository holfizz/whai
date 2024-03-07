'use client'

import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { apolloClient } from './apollo-client'

import { ApolloProvider } from '@apollo/client'
import dynamic from 'next/dynamic'


type Props = {
	children?: React.ReactNode
}
const LayoutClient = dynamic(() => import('@/widgets/Layout'), { ssr: false })
if (true) {
	// Adds messages only in a dev environment
	loadDevMessages()
	loadErrorMessages()
}

export const Providers = ({ children }: Props) => {
	return (
		<ApolloProvider client={apolloClient}>
			<LayoutClient>{children}<LayoutClient/>
		</ApolloProvider>
	)
}
