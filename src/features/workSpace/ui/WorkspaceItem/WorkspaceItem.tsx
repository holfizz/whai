import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './WorkspaceItem.module.scss'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'

interface WorkspaceItemProps {
	className?: string
	text: string
	id: string | number
}

const WorkspaceItem: FC<WorkspaceItemProps> = memo(
	({ className, text, id }) => {
		const { isCollapsed } = useSidebar()
		return (
			<button className={classNames(cls.WorkspaceItem, {}, [className])}>
				<Text
					className={classNames(cls.text, { [cls.id]: true })}
					size={TextSize.S}
					title={String(id)}
				/>
				{!isCollapsed && (
					<Text className={cls.text} size={TextSize.S} title={text} />
				)}
			</button>
		)
	},
)

export default WorkspaceItem
