'use client'
import { useWindowSize } from '@/shared/lib/hooks/useWindowSize'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import Text from '@/shared/ui/Text/Text'
import { Navbar } from '@/widgets/Navbar'
import { Select, SelectItem } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { sidebarListItems } from '../../model/sidebaListItem'
import { AccessibilityTab } from '../Tab/AccessibilityTab/AccessibilityTab'
import { AdvancedTab } from '../Tab/AdvancedTab/AdvancedTab'
import { AppearanceTab } from '../Tab/AppearanceTab/AppearanceTab'
import { IntegrationsTab } from '../Tab/Integrations/IntegrationsTab'
import { LanguageTab } from '../Tab/LanguageTab/LanguageTab'
import { NotificationsTab } from '../Tab/NotificationsTab/NotificationsTab'
import { SecureTab } from '../Tab/SecureTab/SecureTab'
import { UserTab } from '../Tab/UserTab/UserTab'
import cls from './settings.module.scss'

export default function Page() {
	const t = useTranslations('SidebarSetting')
	const [tabId, setTabId] = useState<number>(1)
	const { width } = useWindowSize()

	return (
		<div className={cls.SettingsPage}>
			<Navbar />
			<div className={cls.SettingsPageWrapper}>
				<aside className={cls.sidebar}>
					<div className={cls.ContentWrappers}>
						{!!width && (
							<>
								{width <= 1440 ? (
									<div>
										<Text title={t('Select an option')}></Text>
										<Select
											label={t('Select an option')}
											items={sidebarListItems}
											placeholder={t('Select an option')}
											className='max-w-xs'
											defaultSelectedKeys={[sidebarListItems[0].text]}
											startContent={
												<Icon SVG={sidebarListItems[tabId - 1].Icon} />
											}
										>
											{item => (
												<SelectItem
													startContent={<Icon SVG={item.Icon} />}
													onClick={() => setTabId(item.id)}
													key={item.text}
												>
													{t(item.text)}
												</SelectItem>
											)}
										</Select>
									</div>
								) : (
									<div className={cls.SidebarItems}>
										<Text className={cls.title} text={t('User settings')} />
										{sidebarListItems.map(item => (
											<>
												{item.text === 'Appearance' && (
													<>
														<div className={cls.line} />
														<Text
															className={cls.title}
															text={t('App settings')}
														/>
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
								)}
							</>
						)}
					</div>
				</aside>
				<div className={cls.ContentWrapper}>
					{tabId === 1 && <UserTab />}
					{tabId === 2 && <SecureTab />}
					{tabId === 3 && <IntegrationsTab />}
					{tabId === 4 && <AppearanceTab />}
					{tabId === 5 && <AccessibilityTab />}
					{tabId === 6 && <LanguageTab />}
					{tabId === 7 && <NotificationsTab />}
					{tabId === 8 && <AdvancedTab />}
				</div>
			</div>
		</div>
	)
}
