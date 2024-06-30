import {
	getChatWithAIRoute,
	getCoursesRoute,
	getDashboardRoute,
	getSettingsRoute,
	getStatisticsRoute,
} from '@/shared/const/router'
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
		link: getDashboardRoute(),
	},
	{
		text: 'Courses',
		icon: BookHeart,
		link: getCoursesRoute(),
	},
	{
		text: 'Chat with AI',
		icon: Brain,
		link: getChatWithAIRoute(),
	},
	{
		text: 'Statistics',
		icon: BarChartBig,
		link: getStatisticsRoute(),
	},

	{
		text: 'Settings',
		icon: Settings,
		link: getSettingsRoute(),
	},
]
