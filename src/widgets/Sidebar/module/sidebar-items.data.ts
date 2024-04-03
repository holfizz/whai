import { getAiChatRoute, getDashboardRoute } from '@/shared/const/router'
import { IconType } from 'react-icons'
import { FaChartLine } from 'react-icons/fa6'
import { LuFolderDot, LuLayoutDashboard } from 'react-icons/lu'
import { TbBrandHipchat } from 'react-icons/tb'

export interface SidebarSimpleItem {
	link: string
	icon: IconType
	text: string
}

interface CoursesItem extends SidebarSimpleItem {
	projects: Project[]
}

interface Project {
	id: number
	name: string
}
export type SidebarItem = SidebarSimpleItem | CoursesItem
export const sidebarItems: SidebarItem[] = [
	{
		link: getDashboardRoute(),
		icon: LuLayoutDashboard,
		text: 'Dashboard',
	},
	{
		link: getAiChatRoute(),
		icon: TbBrandHipchat,
		text: 'Chat',
	},
	{
		link: '/i/courses',
		icon: LuFolderDot,
		text: 'Courses',
		projects: [
			{ id: 1, name: 'Project 1' },
			{ id: 2, name: 'Project 2' },
		],
	},
	{
		link: '/i/analytics',
		icon: FaChartLine,
		text: 'Analytics',
	},
]
