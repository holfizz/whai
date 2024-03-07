import { classNames } from '@/shared/lib/classNames/classNames'
import Button, { ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import Line, { LineSize } from '@/shared/ui/Line/Line'
import Logo, { LogoSize } from '@/shared/ui/Logo/Logo'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs'
import { IoAddCircleOutline } from 'react-icons/io5'
import cls from './SidebarHeader.module.scss'
import SidebarHeaderItem from './SidebarHeaderItem'

interface SidebarHeaderProps {
	isCollapsed: boolean
}

const SidebarHeader: FC<SidebarHeaderProps> = ({ isCollapsed }) => {
	const { t } = useTranslation()
	const [isCollapsedCourseMenu, setIsCollapsedCourseMenu] =
		useState<boolean>(false)
	return (
		<div
			className={classNames(
				cls.sidebarHeader,
				{ [cls.collapsed]: isCollapsed },
				[],
			)}
		>
			<div className={cls.profileBlock}>
				<div className={cls.avatar}>
					<Logo logoSize={LogoSize.FULL} logoType='short' />
				</div>
				{!isCollapsed && (
					<div className={cls.profileData}>
						<Text
							size={TextSize.S}
							title={t('Mode')}
							text={t('Creator')}
						></Text>
					</div>
				)}
				<Button
					onClick={() => setIsCollapsedCourseMenu(prevState => !prevState)}
					theme={ButtonTheme.CLEAR}
				>
					<Icon
						fontSize={20}
						SVG={isCollapsedCourseMenu ? BsArrowsExpand : BsArrowsCollapse}
					/>
				</Button>
			</div>
			<div className={cls.coursesBlock}>
				<div className={cls.coursesItem}>
					<SidebarHeaderItem color={'#ef9590'} isCollapsed={isCollapsed} />
					<SidebarHeaderItem color={'#e8f99b'} isCollapsed={isCollapsed} />
					<SidebarHeaderItem color={'#ff7343'} isCollapsed={isCollapsed} />
					<SidebarHeaderItem color={'#2f311d'} isCollapsed={isCollapsed} />
					<SidebarHeaderItem color={'#514665'} isCollapsed={isCollapsed} />
					<SidebarHeaderItem color={'#ddc6e9'} isCollapsed={isCollapsed} />
				</div>
				<Line
					className={cls.line}
					lineSize={LineSize.LONG}
					color={'var(--grey-100)'}
				/>
				<Button
					className={cls.createCourseButton}
					theme={ButtonTheme.CLEAR}
					size={ButtonSize.FULL}
				>
					{!isCollapsed && 'Create a Course '}
					<IoAddCircleOutline fontSize={20} />
				</Button>
			</div>
		</div>
	)
}

export default SidebarHeader
