'use client'
import { getLocalStorage } from '@/shared/lib/utils/localStorage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUseSidebar {
	setIsCollapsed: (isCollapsed: boolean) => void
	isCollapsed: boolean
}

export const useSidebar = create<IUseSidebar>()(
	persist(
		set => ({
			isCollapsed: getLocalStorage('sidebarCollapsed'),
			setIsCollapsed: isCollapsed => set(() => ({ isCollapsed: isCollapsed })),
		}),
		{ name: 'sidebarCollapsed' },
	),
)
