import { Link } from '@/navigation'
import Logo from '@/shared/assets/logo/WhaiSmall.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { PiArrowsCounterClockwiseBold } from 'react-icons/pi'
import cls from './SidebarHeader.module.scss'

const SidebarHeader = () => {
	const t = useTranslations()
	useState<boolean>(false)
	return (
		<div className={classNames(cls.sidebarHeader, {}, [])}>
			<div className={cls.profileBlock}>
				<Link className={cls.avatar} href={'/'}>
					<Icon className={cls.logo} SVG={Logo} />
				</Link>
				<div className={cls.profileData}>
					<Text size={TextSize.S} title={t('Mode')} text={t('Creator')}></Text>
				</div>
				<Button className={cls.changeModeButton} color='clear'>
					<Icon
						fontSize={24}
						className={cls.changeModeIcon}
						SVG={PiArrowsCounterClockwiseBold}
					/>
				</Button>
			</div>
		</div>
	)
}

export default SidebarHeader
