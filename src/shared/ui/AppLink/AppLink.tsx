import { classNames } from '@/shared/lib/classNames/classNames'
import Link, { LinkProps } from 'next/link'
import { memo, type FC, type PropsWithChildren } from 'react'
import cls from './AppLink.module.scss'

interface AppLinkProps extends LinkProps {
	className?: string
}

const AppLink: FC<PropsWithChildren<AppLinkProps>> = memo(
	({ className, children, href, ...otherProps }) => {
		return (
			<Link
				href={href}
				className={classNames(cls.AppLink, {}, [className])}
				{...otherProps}
			>
				{children}
			</Link>
		)
	},
)

export default AppLink
