'use client'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { LangSwitcher } from '@/features/langSwitcher'
import { ThemeSwitcher } from '@/features/themeSwitcher'

interface SidebarProps {
	className?: string;
	setIsCollapsed:Dispatch<SetStateAction<boolean>>
}

const Sidebar: FC<SidebarProps> = memo(({ className, setIsCollapsed }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const onToggle = () => {
    setCollapsed((prevState) => !prevState)
		  setIsCollapsed(collapsed)
  }
  return (
    <aside className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <button
        className={cls.SidebarCollapsed}
        onClick={onToggle}
		    >
        <div className={cls.buttonCollapsed}>
          {collapsed ? <IoIosArrowBack /> : <IoIosArrowForward />}
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
