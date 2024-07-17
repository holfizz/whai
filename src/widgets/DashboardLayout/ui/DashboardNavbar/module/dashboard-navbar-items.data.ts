import { logout } from '@/features/auth/model/auth.model'
import {
	getDashboardRoute,
	getSettingsRoute,
	getSupportRoute
} from '@/shared/const/router'
import {
	Gauge,
	HelpCircle,
	LogOut,
	LucideIcon,
	Settings,
	User
} from 'lucide-react'

export interface IDashboardNavbarItem {
	key: string
	text: string
	link?: string // Если элемент требует ссылки
	onClick?: () => void // Если элемент требует действия
	icon?: LucideIcon // Иконка для элемента
}

export const dashboardNavbarItems: IDashboardNavbarItem[] = [
	{
		key: 'profile',
		text: 'Signed in as',
		link: '/profile',
		icon: User
	},
	{
		key: 'dashboard',
		text: 'Dashboard',
		link: getDashboardRoute(),
		icon: Gauge
	},
	{
		key: 'settings',
		text: 'Settings',
		link: getSettingsRoute(),
		icon: Settings
	},
	{
		key: 'help_and_feedback',
		text: 'Help & Feedback',
		link: getSupportRoute(),
		icon: HelpCircle
	},
	{
		key: 'logout',
		text: 'Log Out',
		onClick: logout,
		icon: LogOut
	}
]
