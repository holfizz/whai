'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import AppLink from '@/shared/ui/AppLink/AppLink'
import { ReactNode, useState } from 'react'
import { DropdownDirection } from '../../../../types/ui'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'
import cls from './Dropdown.module.scss'

export interface DropdownItem {
	disabled?: boolean
	content?: ReactNode
	onClick?: () => void
	href?: string
}

interface DropdownProps {
	className?: string
	items: DropdownItem[]
	direction?: DropdownDirection
	trigger: ReactNode
}

export function Dropdown(props: DropdownProps) {
	const { className, trigger, items, direction = 'bottom right' } = props
	const [menuOpen, setMenuOpen] = useState(false)

	const menuClasses = [mapDirectionClass[direction]]

	return (
		<div
			className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
			onMouseEnter={() => setMenuOpen(true)}
			onMouseLeave={() => setMenuOpen(false)}
		>
			{trigger}
			{menuOpen && (
				<div className={classNames(cls.menu, {}, menuClasses)}>
					{items.map((item, index) => {
						if (item.href) {
							return (
								<AppLink href={item.href} key={index}>
									{item.content}
								</AppLink>
							)
						}

						return <div key={index}>{item.content}</div>
					})}
				</div>
			)}
		</div>
	)
}
