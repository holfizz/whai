import {Link} from '@/navigation'
import {classNames} from '@/shared/lib/classNames/classNames'
import {LinkProps} from 'next/link'
import {type FC, memo, type PropsWithChildren} from 'react'
import cls from './AppLink.module.scss'

interface AppLinkProps extends LinkProps {
	className?: string
}

const AppLink: FC<PropsWithChildren<AppLinkProps>> = memo(
	({ className, children, href, ...otherProps }) => {
		return (
			<Link href={href} className={classNames(cls.AppLink, {}, [className])}>
				{children}
			</Link>
		)
	},
)

export default AppLink
