import createIntlMiddleware from 'next-intl/middleware'

const locales = ['en', 'ru']

export default createIntlMiddleware({
	locales,
	defaultLocale: 'en',
})

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
}
