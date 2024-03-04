import { useAuth } from '@/features/auth'
import { authConstants } from '@/shared/const/auth'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './Sidebar.module.scss'

const SidebarControl = ({ isCollapsed }: { isCollapsed: boolean }) => {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isFormType, setIsFormType] = useState(authConstants.LOGIN)
	const { user, logout } = useAuth()
	const { t } = useTranslation()

	const authActionButton = () => (user ? logout() : toggleAuthModal())
	const maskEmail = (email: string) =>
		email ? `${email.charAt(0)}...${email.split('@').pop()}` : 'User'
	const toggleAuthModal = useCallback(() => setIsOpenModal(prev => !prev), [])
	return (
		<div className={cls.sidebarControl}>
			{/* <div className={cls.switchers}>
				<LangSwitcher />
				<ThemeSwitcher />
			</div>
			<button onClick={authActionButton} className={cls.authButton}>
				{user ? (
					<div className={cls.userProfile}>
						<div className={cls.avatar}>
							<Icon className={cls.userIcon} SVG={RiUser4Line} fontSize={30} />
						</div>
						{!isCollapsed && (
							<Text
								className={cls.email}
								size={TextSize.L}
								theme={TextTheme.PRIMARY}
								text={maskEmail(user.email)}
							/>
						)}
					</div>
				) : (
					<div className={cls.authControl}>
						<Icon SVG={HiLogin} fontSize={30} />
						{!isCollapsed && (
							<Text
								size={TextSize.S}
								theme={TextTheme.PRIMARY}
								title={t('log in')}
							/>
						)}
					</div>
				)}
			</button>
			<AuthModal
				setIsFormType={setIsFormType}
				isOpen={isOpenModal}
				onClose={toggleAuthModal}
				type={isFormType}
			/> */}
		</div>
	)
}

export default SidebarControl
