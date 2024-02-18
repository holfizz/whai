import React from 'react'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import cls from './Workspace.module.scss'
import WorkspaceItem from '@/features/workSpace/ui/WorkspaceItem/WorkspaceItem'
import Icon from '@/shared/ui/Icon/Icon'
import { MdWorkspacesOutline } from 'react-icons/md'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'

const Workspace = () => {
	const { t } = useTranslation()
	const { isCollapsed } = useSidebar()
	const data = [
		{
			id: 1,
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet.',
		},
		{
			id: 2,
			text: 'Fusce ut fermentum elit. Quisque nec nulla ut erat dictum condimentum.',
		},
		{
			id: 3,
			text: 'Nulla facilisi. Aenean sed tellus sed neque tempus bibendum.',
		},
		{
			id: 4,
			text: 'Vestibulum id dolor nec sem commodo fermentum. In venenatis congue risus.',
		},
		{
			id: 5,
			text: 'Cras in nisi eu arcu hendrerit convallis nec nec libero. In viverra eleifend leo vitae venenatis.',
		},
		{
			id: 6,
			text: 'Donec vestibulum tortor vel sem consequat, sit amet ultrices ex sagittis.',
		},
		{
			id: 7,
			text: 'Praesent luctus urna vel justo varius, vitae cursus neque hendrerit.',
		},
		{
			id: 8,
			text: 'Integer tempus nisi eget nulla fermentum, in aliquet quam vulputate.',
		},
		{
			id: 9,
			text: 'Phasellus consectetur ex ac augue ultricies, sit amet aliquet odio hendrerit.',
		},
		{
			id: 10,
			text: 'Aenean ac magna nec ligula lacinia rhoncus. Cras dignissim, orci sed tempus tempus, est eros finibus velit, eget accumsan augue urna vel justo.',
		},
		{
			id: 11,
			text: 'Morbi nec velit id ipsum lacinia dapibus non quis turpis.',
		},
		{
			id: 12,
			text: 'Suspendisse potenti. Maecenas tempus placerat tellus, sit amet feugiat nunc pellentesque a.',
		},
		{
			id: 13,
			text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur rhoncus.',
		},
		{
			id: 14,
			text: 'Duis euismod viverra velit, in laoreet sapien sollicitudin sed.',
		},
		{
			id: 15,
			text: 'Sed ac leo vel nunc eleifend lobortis. Quisque vehicula aliquet dolor sit amet hendrerit.',
		},
		{
			id: 16,
			text: 'Mauris non sapien quis ante varius ultricies vitae nec justo.',
		},
		{
			id: 17,
			text: 'Ut hendrerit lorem a magna rhoncus, id condimentum est fermentum.',
		},
		{
			id: 18,
			text: 'In quis odio feugiat, finibus neque id, consequat ligula.',
		},
		{
			id: 19,
			text: 'Vivamus in urna vestibulum, feugiat lacus id, suscipit risus.',
		},
		{
			id: 20,
			text: 'Aenean tincidunt, justo eu condimentum consequat, quam mi dignissim orci, at tincidunt nibh lectus nec erat.',
		},
	]

	return (
		<div className={cls.Workspace}>
			<div className={cls.workspaceTitle}>
				<Icon fontSize={30} SVG={MdWorkspacesOutline} />
				{!isCollapsed && <Text title={t('Workspace')} size={TextSize.M} />}
			</div>
			<div className={cls.chats}>
				{data.map(item => (
					<WorkspaceItem key={item.id} text={item.text} id={item.id} />
				))}
			</div>
		</div>
	)
}

export default Workspace
