/** @type {import('next').NextConfig} */
import MillionCompiler from '@million/lint'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/i18n.ts')
const nextConfig = {
	env: {
		GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
		GRAPHQL_WS_SERVER_URL: process.env.GRAPHQL_WS_SERVER_URL,
		CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
	},

	swcMinify: true,
	reactStrictMode: true,
}

export default withNextIntl(
	MillionCompiler.next({
		rsc: true,
	})(nextConfig),
)
