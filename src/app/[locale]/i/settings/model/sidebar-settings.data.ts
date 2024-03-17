import { IconType } from 'react-icons'
import { BiPalette } from 'react-icons/bi'
import { BsShield } from 'react-icons/bs'
import { GrConnect } from 'react-icons/gr'
import { HiOutlineBell } from 'react-icons/hi'
import { IoAccessibilityOutline } from 'react-icons/io5'
import { MdLanguage } from 'react-icons/md'
import { RiUserSettingsLine } from 'react-icons/ri'
import { VscSettings } from 'react-icons/vsc'
interface ISidebarListItem {
	id: number
	text: string
	Icon: IconType
}

export const sidebarListItems: ISidebarListItem[] = [
	{
		id: 1,
		text: 'My account',
		Icon: RiUserSettingsLine,
	},
	{
		id: 2,
		text: 'Privacy & safety',
		Icon: BsShield,
	},
	{
		id: 3,
		text: 'Integrations',
		Icon: GrConnect,
	},
	{
		id: 4,
		text: 'Appearance',
		Icon: BiPalette,
	},
	{
		id: 5,
		text: 'Accessibility',
		Icon: IoAccessibilityOutline,
	},
	{
		id: 6,
		text: 'Language',
		Icon: MdLanguage,
	},
	{
		id: 7,
		text: 'Notifications',
		Icon: HiOutlineBell,
	},
	{
		id: 8,
		text: 'Advanced',
		Icon: VscSettings,
	},
]
