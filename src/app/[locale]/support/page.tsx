import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'
import SupportPage from './(ui)/Support.page'

export const metadata: Metadata = {
	title: 'Оформление подписки | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <SupportPage />
}
