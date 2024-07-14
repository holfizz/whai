// Sidebar.jsx
import Logo from '@/shared/ui/Logo/Logo'
import Text from '@/shared/ui/Text/Text'
import { sidebarItems } from '../../module/sidebar-items.data'
import SidebarItem from '../SidebarItem/SidebarItem'
import cls from './Sidebar.module.scss'
import SidebarCollapsedButton from './SidebarCollapsedButton'
import { useSidebar } from '@/widgets/DashboardLayout/ui/Sidebar'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
	const setIsCollapsed = useSidebar(state => state.setIsCollapsed)
	const isCollapsed = useSidebar(state => state.isCollapsed)
	const router = useRouter()
	useEffect(() => {
		window.outerWidth <= 1024 ? setIsCollapsed(true) : null
	}, [isCollapsed])
	return (
		<aside
			style={{
				width: `${
					isCollapsed
						? 'var(--sidebar-width-collapsed)'
						: 'var(--sidebar-width)'
				}`
			}}
			className={cls.sidebar}
		>
			<div onClick={() => router.push('/')} className={cls.logoBlock}>
				<Logo
					color='var(--color-accent)'
					logoType={'short'}
					className={cls.logo}
				/>
				{!isCollapsed && <Text classNameTitle={cls.logoTitle} title='Whai' />}
			</div>
			<SidebarCollapsedButton
				setIsCollapsed={setIsCollapsed}
				isCollapsed={isCollapsed}
			/>
			<div className={cls.container}>
				{sidebarItems.map(item => {
					return (
						<SidebarItem
							isCollapsed={isCollapsed}
							key={item.text}
							item={item}
						></SidebarItem>
					)
				})}
			</div>
		</aside>
	)
}

export default Sidebar
