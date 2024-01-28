import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import Logo from '@/shared/ui/Logo/Logo'

interface NavbarProps {
	className?: string;
}

const Navbar: FC<NavbarProps> = memo(({ className }) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.logo}>
        <Logo />
      </div>
    </div>
  )
})

export default Navbar
