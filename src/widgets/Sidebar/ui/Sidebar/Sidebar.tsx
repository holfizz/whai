'use client'
import { Dispatch, FC, memo, SetStateAction, useEffect } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { LangSwitcher } from '@/features/langSwitcher'
import { ThemeSwitcher } from '@/features/themeSwitcher'
import { LOCAL_STORAGE_SIDEBAR_COLLAPSED } from '@/shared/const/localStorage'

interface SidebarProps {
	className?: string;
	setIsCollapsed:Dispatch<SetStateAction<boolean>>,
	isCollapsed:boolean
}

const Sidebar: FC<SidebarProps> = memo(({ className, setIsCollapsed, isCollapsed }) => {
  const onToggle = () => {
	  setIsCollapsed((prevState) => !prevState)
	  localStorage.setItem(LOCAL_STORAGE_SIDEBAR_COLLAPSED, String(isCollapsed))
  }
  useEffect(() => {
	  setIsCollapsed(!JSON.parse(localStorage.getItem(LOCAL_STORAGE_SIDEBAR_COLLAPSED ) || 'false'))
  }, [isCollapsed, setIsCollapsed])
  return (
    <aside className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [className])}>
      <button
        className={cls.SidebarCollapsed}
        onClick={onToggle}
		    >
        <div className={cls.buttonCollapsed}>
          {isCollapsed ? <IoIosArrowBack /> : <IoIosArrowForward />}
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
