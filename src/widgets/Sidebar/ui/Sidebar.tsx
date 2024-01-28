import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'

interface SidebarProps {
	className?: string;
}

const Sidebar: FC<SidebarProps> = memo(({ className }) => {
  return (
    <div className={classNames(cls.Sidebar, {}, [className])}>

    </div>
  )
})

export default Sidebar
