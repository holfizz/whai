import { logout } from '@/features/auth/model/auth.model'
import { getDashboardRoute, getSupportRoute } from '@/shared/const/router'

export interface IDashboardNavbarItem {
	key: string
	text: string
	link?: string // Если элемент требует ссылки
	onClick?: () => void // Если элемент требует действия
	icon?: any // Иконка для элемента
}

export const dashboardNavbarItems: IDashboardNavbarItem[] = [
	{
		key: 'profile',
		text: 'Signed in as',
		link: '/profile'
	},
	{
		key: 'dashboard',
		text: 'Dashboard',
		link: getDashboardRoute()
	},
	// {
	// 	key: 'settings',
	// 	text: 'Settings',
	// 	link: getSettingsRoute(),
	// 	icon: Settings
	// },
	{
		key: 'help_and_feedback',
		text: 'Help & Feedback',
		link: getSupportRoute()
	},
	{
		key: 'logout',
		text: 'Log Out',
		onClick: () => {
			logout(true)
		}
	}
]
