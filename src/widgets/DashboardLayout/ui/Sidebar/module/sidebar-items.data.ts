import {
	BarChartBig,
	BookHeart,
	Brain,
	House,
	LucideIcon,
	Settings,
} from 'lucide-react'
export interface ISidebarItem {
	link: string
	icon: LucideIcon
	text: string
}

export const sidebarItems: ISidebarItem[] = [
	{
		text: 'Main',
		icon: House,
		link: '/main',
	},
	{
		text: 'Courses',
		icon: BookHeart,
		link: '/courses',
	},
	{
		text: 'Chat with AI',
		icon: Brain,
		link: '/',
	},
	{
		text: 'Statistics',
		icon: BarChartBig,
		link: '/statistics',
	},

	{
		text: 'Settings',
		icon: Settings,
		link: '/settings',
	},
]
