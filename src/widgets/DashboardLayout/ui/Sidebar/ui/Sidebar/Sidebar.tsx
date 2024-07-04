// Sidebar.jsx
import Logo from '@/shared/ui/Logo/Logo'
import Text from '@/shared/ui/Text/Text'
import {useTranslations} from 'next-intl'
import {useState} from 'react'
import {sidebarItems} from '../../module/sidebar-items.data'
import SidebarItem from '../SidebarItem/SidebarItem'
import cls from './Sidebar.module.scss'
import SidebarCollapsedButton from './SidebarCollapsedButton'

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const t = useTranslations()
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleMenuClick = menuId => {
    setActiveMenu(activeMenu === menuId ? null : menuId)
  }

  return (
    <aside
      style={{
        width: `${
          isCollapsed
            ? 'var(--sidebar-width-collapsed)'
            : 'var(--sidebar-width)'
        }`,
      }}
      className={cls.sidebar}
    >
      <div className={cls.logoBlock}>
        <Logo
          color='var(--color-accent)'
          logoType={'short'}
          className={cls.logo}
        />
        {!isCollapsed && <Text classNameTitle={cls.logoTitle} title='Whai'/>}
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
