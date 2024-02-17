import { Dispatch, FC, SetStateAction, Suspense } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AuthModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal'
import Loader from '@/shared/ui/Loader/Loader'
import AuthFormAsync from '@/features/auth/ui/AuthForm/AuthForm.async'
import { authConstants } from '@/shared/const/auth'
import { Drawer } from '@/shared/ui/Drawer/Drawer'

interface LoginModalProps {
	isOpen: boolean
	onClose: Dispatch<SetStateAction<boolean>>
	type: authConstants
	setIsFormType?: Dispatch<SetStateAction<authConstants>>
}

export const AuthModal: FC<LoginModalProps> = ({
	onClose,
	type,
	isOpen,
	setIsFormType,
}) => {
	if (document.documentElement.scrollWidth <= 450) {
		return (
			<Drawer
				isOpen={isOpen}
				onClose={() => {
					onClose(false)
				}}
				className={classNames(cls.LoginModal, {}, [])}
			>
				<div className={classNames(cls.wrapper, {}, [])}>
					<Suspense fallback={<Loader />}>
						<AuthFormAsync
							setIsFormType={setIsFormType}
							onClose={onClose}
							type={type}
						/>
					</Suspense>
				</div>
			</Drawer>
		)
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className={classNames(cls.LoginModal, {}, [])}
		>
			<div className={classNames(cls.wrapper, {}, [])}>
				<Suspense fallback={<Loader />}>
					<AuthFormAsync
						setIsFormType={setIsFormType}
						onClose={onClose}
						type={type}
					/>
				</Suspense>
			</div>
		</Modal>
	)
}
