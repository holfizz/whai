import Button, { ButtonTheme } from '@/shared/ui/Button/Button'
import { Dropdown } from '@/shared/ui/Popups'
import { DropdownItem } from '@/shared/ui/Popups/components/Dropdown/Dropdown'
import { useState } from 'react'
import cls from './NavbarItem.module.scss' // Подключение модульных стилей

interface NavbarItemProps {
	label: string

	menuItems: DropdownItem[]
}

export function NavbarItem({ label, menuItems }: NavbarItemProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleMenuOpen = () => {
		setIsMenuOpen(true)
	}

	const handleMenuClose = () => {
		setIsMenuOpen(false)
	}

	return (
		<div
			className={cls.NavbarItem}
			onMouseEnter={handleMenuOpen}
			onMouseLeave={handleMenuClose}
		>
			<Dropdown
				items={menuItems}
				trigger={
					<Button className={cls.menuButton} theme={ButtonTheme.CLEAR}>
						{label}
					</Button>
				}
			></Dropdown>
		</div>
	)
}

export default NavbarItem
