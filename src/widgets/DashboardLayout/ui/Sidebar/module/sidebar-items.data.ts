import ChatIcon from '@/shared/assets/icons/Chat'
import HomeIcon from '@/shared/assets/icons/Home'
import LibraryIcon from '@/shared/assets/icons/Library'
import MyCoursesIcon from '@/shared/assets/icons/MyCourses'
import StatisticsIcon from '@/shared/assets/icons/Statistics'
import {
	getChatWithAIRoute,
	getCoursesRoute,
	getDashboardRoute,
	getLibraryRoute,
	getStatisticsRoute
} from '@/shared/const/router'

export interface ISidebarItem {
	link: string
	icon: any
	text:
		| 'Main'
		| 'Courses'
		| 'Chat with AI'
		| 'Statistics'
		// | 'Settings'
		| 'Library'
}

export const sidebarItems: ISidebarItem[] = [
	{
		text: 'Main',
		icon: HomeIcon,
		link: getDashboardRoute()
	},
	{
		text: 'Library',
		icon: LibraryIcon,
		link: getLibraryRoute()
	},
	{
		text: 'Courses',
		icon: MyCoursesIcon,
		link: getCoursesRoute()
	},
	{
		text: 'Chat with AI',
		icon: ChatIcon,
		link: getChatWithAIRoute()
	},
	{
		text: 'Statistics',
		icon: StatisticsIcon,
		link: getStatisticsRoute()
	}

	// {
	// 	text: 'Settings',
	// 	icon: SettingsIcon,
	// 	link: getSettingsRoute()
	// }
]
