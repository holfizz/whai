import { Link } from '@/navigation'
import { WhaiSmall } from '@/shared/assets/logo/WhaiSmall'
import { classNames } from '@/shared/lib/classNames/classNames'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { PiArrowsCounterClockwiseBold } from 'react-icons/pi'
import cls from './SidebarHeader.module.scss'
interface SidebarHeaderProps {
	isCollapsed?: boolean
	width?: number
}

const SidebarHeader: FC<SidebarHeaderProps> = ({ width, isCollapsed }) => {
	const t = useTranslations()
	if (width && width < 768) {
		return (
			<div
				className={classNames(
					cls.sidebarHeader,
					{ [cls.collapsed]: isCollapsed },
					[],
				)}
			>
				<div className={cls.profileBlock}>
					<Link className={cls.avatar} href={'/'}>
						<WhaiSmall className={cls.logo} />
					</Link>
					<div className={cls.profileData}>
						<Text
							size={TextSize.S}
							title={t('Mode')}
							text={t('Creator')}
						></Text>
					</div>
					<Button isIconOnly className={cls.changeModeButton} color='clear'>
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
	return (
		<div className={classNames(cls.sidebarHeader, {}, [])}>
			<div className={cls.profileBlock}>
				<Link className={cls.avatar} href={'/'}>
					<WhaiSmall className={cls.logo} />
				</Link>
				<div className={cls.profileData}>
					<Text size={TextSize.S} title={t('Mode')} text={t('Creator')}></Text>
				</div>
				<Button isIconOnly className={cls.changeModeButton} color='clear'>
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
