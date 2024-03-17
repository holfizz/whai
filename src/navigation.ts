import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = [
	'en',
	'zh',
	'es',
	'hi',
	'ar',
	'pt',
	'bn',
	'ru',
	'ja',
	'de',
	'fr',
	'it',
] as const
export const localePrefix = 'always'

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ locales, localePrefix })
