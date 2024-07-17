import { locales } from '@/navigation'
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Can be imported from a shared config

export default getRequestConfig(async ({ locale }) => {
	if (!locales.includes(locale as any)) notFound()

	return {
		messages: (await import(`../../../../messages/${locale}.json`)).default
	}
})
