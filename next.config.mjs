/** @type {import('next').NextConfig} */
import MillionCompiler from '@million/lint'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/i18n.ts')
const nextConfig = {
	env: {
		GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
		GRAPHQL_WS_SERVER_URL: process.env.GRAPHQL_WS_SERVER_URL,
		API_DOMAIN: process.env.API_DOMAIN,
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg'),
		)

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ['@svgr/webpack'],
			},
		)

		fileLoaderRule.exclude = /\.svg$/i

		return config
	},

	swcMinify: true,
	reactStrictMode: true,
}

export default withNextIntl(
	MillionCompiler.next({
		rsc: true,
	})(nextConfig),
)
