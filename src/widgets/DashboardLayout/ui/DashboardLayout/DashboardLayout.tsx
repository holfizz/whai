'use client'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/shared/ui/Resizable/Resizable'
import { Navbar } from '@/widgets/Navbar'
import Sidebar, { useSidebar } from '@/widgets/Sidebar'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import cls from './DashboardLayout.module.scss'

interface LayoutProps {
	children: ReactNode
	className?: string
}

export const DashboardLayout: FC<LayoutProps> = ({ children, className }) => {
	const { isCollapsed, setIsCollapsed } = useSidebar()
	const [sidebarSize, setSidebarSize] = useState(50)

	const onCollapse = useCallback(() => {
		setIsCollapsed(!isCollapsed)
		if (isCollapsed) {
			setSidebarSize(50)
		}
	}, [isCollapsed, setIsCollapsed])

	useEffect(() => {
		if (isCollapsed) {
			setSidebarSize(0)
		}
	}, [isCollapsed])

	const onResize = useCallback(
		(size: number) => {
			if (size < 5.7) {
				setIsCollapsed(true)
			} else {
				setSidebarSize(size)
				if (isCollapsed) {
					setIsCollapsed(false)
				}
			}
		},
		[isCollapsed, setIsCollapsed],
	)

	return (
		<ResizablePanelGroup direction='horizontal' className={cls.DashboardLayout}>
			<ResizablePanel
				id='sidebar'
				minSize={5.7}
				defaultSize={sidebarSize}
				maxSize={20}
				onCollapse={onCollapse}
				className='h-screen'
				collapsible
				collapsedSize={5.7}
				onResize={onResize}
			>
				<Sidebar />
			</ResizablePanel>
			<ResizableHandle withHandle className='bg-[var(--secondary-color)]' />
			<ResizablePanel defaultSize={250}>
				<ResizablePanelGroup direction='vertical'>
					<ResizablePanel minSize={6} maxSize={12}>
						<Navbar />
					</ResizablePanel>
					<ResizableHandle withHandle className='bg-[var(--secondary-color)]' />
					<ResizablePanel defaultSize={75}></ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
