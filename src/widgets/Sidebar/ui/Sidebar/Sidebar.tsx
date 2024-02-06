'use client'
import { FC, memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'
import LangSwitcher from '@/features/langSwitcher'
import ThemeSwitcher from '@/features/themeSwitcher'

interface SidebarProps {
	className?: string
}

const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const { isCollapsed, setIsCollapsed } = useSidebar()

	if (document.documentElement.scrollWidth <= 768) {
		const [sidebarMobileOpen, setSidebarMobileOpen] = useState<boolean>(false)
		return (
			<>
				{sidebarMobileOpen && (
					<div
						onClick={() => setSidebarMobileOpen(false)}
						className={cls.blur}
					></div>
				)}

				<aside
					className={classNames(
						cls.SidebarMobile,
						{ [cls.openMobileSidebar]: sidebarMobileOpen },
						[className],
					)}
				>
					<button
						onClick={() => setSidebarMobileOpen(prevState => !prevState)}
						className={cls.buttonCollapsedMobile}
					>
						<div></div>
						<div></div>
						<div></div>
					</button>
					<div className={cls.switchers}>
						<LangSwitcher />
						<ThemeSwitcher />
					</div>
				</aside>
			</>
		)
	}
	return (
		<aside
			className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [
				className,
			])}
		>
			<button
				className={cls.SidebarCollapsed}
				onClick={() => {
					setIsCollapsed(isCollapsed)
				}}
			>
				<div className={cls.buttonCollapsed}>
					{isCollapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
				</div>
			</button>
			<div className={cls.switchers}>
				<LangSwitcher />
				<ThemeSwitcher />
			</div>
		</aside>
	)
})

export default Sidebar
