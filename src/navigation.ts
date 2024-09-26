import { createSharedPathnamesNavigation } from 'next-intl/navigation'
export const locales = ['ru', 'en'] as const
export const localePrefix = 'always'
export const defaultLang = 'ru'

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ localePrefix, locales })
