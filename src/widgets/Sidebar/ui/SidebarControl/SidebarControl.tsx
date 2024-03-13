import { LOGOUT } from '@/entities/Auth/model/auth.queries'
import Button from '@/shared/ui/Button/Button'
import { useLazyQuery } from '@apollo/client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { PiStudentBold } from 'react-icons/pi'
import { SiSpringCreators } from 'react-icons/si'
import cls from './SidebarControl.module.scss'

const SidebarControl = ({ isCollapsed }: { isCollapsed: boolean }) => {
	const t = useTranslations()
	const [isCreator, setIsCreator] = useState<boolean>(false)
	const [logoutQuery] = useLazyQuery(LOGOUT, {
		fetchPolicy: 'network-only',
	})
	return (
		<div className={cls.sidebarControl}>
			<Button
				className={cls.changeAccountModeButton}
				onClick={() => setIsCreator(prevState => !prevState)}
			>
				{isCreator ? <SiSpringCreators /> : <PiStudentBold />}
				{!isCollapsed && <>{isCreator ? t('Creator') : t('Student')}</>}
			</Button>
		</div>
	)
}

export default SidebarControl
