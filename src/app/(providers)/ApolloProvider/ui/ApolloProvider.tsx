import { ApolloProvider } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import apolloClient from './apollo-client'

type Props = {
	children?: React.ReactNode
}
if (true) {
	// Adds messages only in a dev environment
	loadDevMessages()
	loadErrorMessages()
}

export const ApolloProviders = ({ children }: Props) => {
	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
