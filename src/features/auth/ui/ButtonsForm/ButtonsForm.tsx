import { Dispatch, FC, SetStateAction } from 'react'
import cls from '../AuthForm/AuthForm.module.scss'

import { authConstants } from '@/shared/const/auth'

import { Link } from '@/navigation'

import {
	getRouteForgotPassword,
	getRouteLogin,
	getRouteSignUp
} from '@/shared/const/router'

import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { sendGTMEvent } from '@next/third-parties/google'

interface ButtonsFormProps {
	type: authConstants
	setIsFormType?: Dispatch<SetStateAction<authConstants>>
}

const ButtonsForm: FC<ButtonsFormProps> = ({ type, setIsFormType }) => {
	const t = useTranslations('auth')

	return (
		<>
			<Button
				color='primary'
				variant='light'
				type={'submit'}
				onClick={() => {
					if (type === authConstants.SIGNUP) {
						sendGTMEvent({
							event: 'buttonClicked',
							value: 'signup_btn'
						})
					}
				}}
				className={cls.submitButton}
			>
				{type === authConstants.LOGIN ? t('Log in') : t('Sign up')}
			</Button>

			<Link
				className={cls.forgotPasswordButton}
				href={getRouteForgotPassword()}
			>
				<Button
					color='danger'
					className='rounded-[30px] mt-2 text-md max-md:text-2xl'
					variant='light'
				>
					{t('Forgot your password?')}
				</Button>
			</Link>

			<Link
				onClick={() =>
					setIsFormType &&
					setIsFormType(
						type === authConstants.LOGIN
							? authConstants.SIGNUP
							: authConstants.LOGIN
					)
				}
				className={cls.changeModeButton}
				href={type === authConstants.LOGIN ? getRouteSignUp() : getRouteLogin()}
			>
				<Button
					variant='lightMain'
					className='rounded-[30px] mt-2 text-md max-md:text-2xl'
					color='main'
				>
					{type === authConstants.LOGIN ? t('Sign up') : t('Log in')}
				</Button>
			</Link>
		</>
	)
}

export default ButtonsForm
