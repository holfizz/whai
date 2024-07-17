/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

// import createMDX from "@next/mdx";

// const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/i18n.ts')
const nextConfig = {
	
	sentry: {
		hideSourceMaps: true
	},
	env: {
		GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
		GRAPHQL_WS_SERVER_URL: process.env.GRAPHQL_WS_SERVER_URL,
		CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
	},

	swcMinify: true,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

}

export default withNextIntl(nextConfig)
