import { FC, memo } from 'react'
import cls from './SidebarItem.module.scss'
import AppLink from '@/shared/ui/AppLink/AppLink'
import { classNames } from '@/shared/lib/classNames/classNames'
import { SidebarItemType } from '@/widgets/Sidebar/module/types/sidebar'


interface SidebarItemProps {
  className?: string;
  item: SidebarItemType;
}

const SidebarItem: FC<SidebarItemProps> = memo(({ item, className }) => {

  // const isAuth = useSelector(getUserAuthData)
  // if(item.authOnly && !isAuth){
  //   return null
  // }
  return (
    <AppLink href={item.path} className={cls.link}>
      <item.Icon />
      <div className={classNames("", {}, [className])}>
        <div>{item.text}</div>
      </div>
    </AppLink>
  )
})

export default SidebarItem
