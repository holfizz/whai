'use client'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import Text from '@/shared/ui/Text/Text'
import { Navbar } from '@/widgets/Navbar'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { sidebarListItems } from '../../model/sidebaListItem'
import { AccessibilityTab } from '../Tab/AccessibilityTab/AccessibilityTab'
import { AdvancedTab } from '../Tab/AdvancedTab/AdvancedTab'
import { AppearanceTab } from '../Tab/AppearanceTab/AppearanceTab'
import { LanguageTab } from '../Tab/LanguageTab/LanguageTab'
import { NotificationsTab } from '../Tab/NotificationsTab/NotificationsTab'
import { SecureTab } from '../Tab/SecureTab/SecureTab'
import { UserTab } from '../Tab/UserTab/UserTab'
import cls from './settings.module.scss'

export default function Page() {
	const t = useTranslations('SidebarSetting')
	const [tabId, setTabId] = useState<number>(1)
	return (
		<div className={cls.SettingsPage}>
			<Navbar />
			<div className={cls.SettingsPageWrapper}>
				<aside className={cls.sidebar}>
					<div className={cls.ContentWrappers}>
						<Text className={cls.title} text={t('User settings')} />
						<div className={cls.SidebarItems}>
							{sidebarListItems.map(item => (
								<>
									{item.id === 3 && (
										<>
											<div className={cls.line} />
											<Text className={cls.title} text={t('App settings')} />
										</>
									)}
									<Button
										onClick={() => setTabId(item.id)}
										className={cls.SidebarItemButton}
										variant='light'
										key={item.id}
									>
										<Icon fontSize={16} SVG={item.Icon} />
										{t(item.text)}
									</Button>
								</>
							))}
						</div>
					</div>
				</aside>
				<div className={cls.ContentWrapper}>
					{tabId === 1 && <UserTab />}
					{tabId === 2 && <SecureTab />}
					{tabId === 3 && <AppearanceTab />}
					{tabId === 4 && <AccessibilityTab />}
					{tabId === 5 && <LanguageTab />}
					{tabId === 6 && <NotificationsTab />}
					{tabId === 7 && <AdvancedTab />}
				</div>
			</div>
		</div>
	)
}
