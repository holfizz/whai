import { type FC, memo, type PropsWithChildren } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'
import Link, { LinkProps } from 'next/link'

interface AppLinkProps extends LinkProps {
  className?: string
}

const AppLink: FC<PropsWithChildren<AppLinkProps>> = memo(({
  className,
  children,
  href,
  ...otherProps
}) => {
  return (
    <Link
      href={href}
      className={classNames(cls.AppLink, {}, [className])}
      {...otherProps}
    >
      {children}
    </Link>
  )
})

export default AppLink
