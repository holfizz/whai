import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { PiStudentBold } from 'react-icons/pi'
import { SiSpringCreators } from 'react-icons/si'
import cls from './SidebarControl.module.scss'

const SidebarControl = ({ isCollapsed }: { isCollapsed: boolean }) => {
	// const [isOpenModal, setIsOpenModal] = useState(false)
	// const [isFormType, setIsFormType] = useState(authConstants.LOGIN)
	// const { user, logout } = useAuth()
	const t = useTranslations()
	const [isCreator, setIsCreator] = useState<boolean>(false)

	// const authActionButton = () => (user ? logout() : toggleAuthModal())
	// const maskEmail = (email: string) =>
	// email ? `${email.charAt(0)}...${email.split('@').pop()}` : 'User'
	// const toggleAuthModal = useCallback(() => setIsOpenModal(prev => !prev), [])
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
