export const GRAPHQL_SERVER_URL = process.env.GRAPHQL_SERVER_URL as string
export const GRAPHQL_WS_SERVER_URL =
	(process.env.GRAPHQL_WS_SERVER_URL as string) ||
	'ws://194.116.215.109/api/graphql'
