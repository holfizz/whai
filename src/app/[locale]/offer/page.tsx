import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import OfferPage from './(ui)/Offer.page'

export const metadata: Metadata = {
	title: 'Оферта',
	description:
		'Ознакомьтесь с условиями оферты платформы Whai. В данном разделе вы найдете все важные юридические и коммерческие условия использования нашего сервиса.',
	keywords: [
		'оферта',
		'условия',
		'Whai',
		'платформа',
		'юридическая информация'
	],
	openGraph: {
		title: 'Оферта - Whai',
		description:
			'Полный текст оферты платформы Whai, включая все юридические условия и правила использования.',
		url: 'https://whai.ru/offer',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <OfferPage />
}
