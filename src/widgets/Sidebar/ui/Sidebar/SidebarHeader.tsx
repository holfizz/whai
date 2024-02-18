import React, { FC } from 'react'
import cls from './Sidebar.module.scss'
import Logo, { LogoSize } from '@/shared/ui/Logo/Logo'
import Button, { ButtonTheme } from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import Input, { InputTheme } from '@/shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
import { LuSearch } from 'react-icons/lu'

interface SidebarHeaderProps {
	isCollapsed: boolean
}

const SidebarHeader: FC<SidebarHeaderProps> = ({ isCollapsed }) => {
	const { t } = useTranslation()
	return (
		<div className={cls.sidebarHeader}>
			{isCollapsed ? (
				<Logo logoSize={LogoSize.S} />
			) : (
				<Logo logoSize={LogoSize.M} />
			)}
			<Button theme={ButtonTheme.CLEAR} className={cls.addButton}>
				<Icon className={cls.addIcon} fontSize={23} SVG={HiOutlinePencilAlt} />
			</Button>

			{!isCollapsed && (
				<div className={cls.searchWrapper}>
					<Icon fontSize={18} className={cls.searchIcon} SVG={LuSearch} />
					<Input
						className={cls.search}
						theme={InputTheme.FILL}
						placeholder={t('Search')}
					/>
				</div>
			)}
		</div>
	)
}

export default SidebarHeader
