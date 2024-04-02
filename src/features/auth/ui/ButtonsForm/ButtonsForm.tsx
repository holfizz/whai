import { FC, Dispatch, SetStateAction } from 'react'
import cls from '../AuthForm/AuthForm.module.scss'

import { authConstants } from '@/shared/const/auth'

import Button from '@/shared/ui/Button/Button'
import { Link } from '@/navigation'

import {
	getRouteForgotPassword,
	getRouteLogin,
	getRouteSignUp,
} from '@/shared/const/router'

import { useTranslations } from 'next-intl'
import { z } from 'zod'

interface ButtonsFormProps {
    type:authConstants
    setIsFormType?: Dispatch<SetStateAction<authConstants>>
}

const ButtonsForm: FC<ButtonsFormProps> = ({
    type,
    setIsFormType,

}) => {

    const t = useTranslations('auth')

    return (
        <>
				<Button color='mainFill' type={'submit'} className={cls.submitButton}>
					{type === authConstants.LOGIN ? t('Log in') : t('Sign up')}
				</Button>

				<Link
					className={cls.forgotPasswordButton}
					href={getRouteForgotPassword()}
				>
					<Button color='danger' variant='light'>
						{t('Forgot your password?')}
					</Button>
				</Link>

				<Link
					onClick={() =>
						setIsFormType &&
						setIsFormType(
							type === authConstants.LOGIN
								? authConstants.SIGNUP
								: authConstants.LOGIN,
						)
					}
					className={cls.changeModeButton}
					href={
						type === authConstants.LOGIN ? getRouteSignUp() : getRouteLogin()
					}
				>
					<Button variant='light' color='warning'>
						{type === authConstants.LOGIN ? t('Sign up') : t('Log in')}
					</Button>

				</Link>
        </>
    )
}

export default ButtonsForm
