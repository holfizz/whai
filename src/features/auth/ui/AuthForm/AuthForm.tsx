import { Link, useRouter } from '@/navigation'
import { saveTokenStorage } from '@/shared/api/auth/auth.helper'
import { authConstants } from '@/shared/const/auth'
import { getRouteOffer, getRoutePrivacy } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import logger from '@/shared/lib/utils/logger'
import { Turnstile } from '@marsidev/react-turnstile'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import {
	Dispatch,
	FC,
	FormEvent,
	memo,
	SetStateAction,
	useEffect,
	useState
} from 'react'
import { z } from 'zod'
import { formLoginSchema, formSignUpSchema } from '../../model/auth.contracts'
import { setAuthUser } from '../../model/auth.model'
import {
	LoginInput,
	SignUpInput,
	useLoginMutation,
	useSignUpMutation
} from '../../model/auth.queries'
import BasicInputs from '../BasicInputs/BasicInputs'
import ButtonsForm from '../ButtonsForm/ButtonsForm'
import InfoMessage from '../InfoMessage/InfoMessage'
import RegistrationInputs from '../RegistrInputs/RegistrInputs'
import cls from './AuthForm.module.scss'

export interface AuthFormProps {
	className?: string
	type: authConstants
	setIsFormType?: Dispatch<SetStateAction<authConstants>>
}

const AuthForm: FC<AuthFormProps> = memo(
	({ className, type, setIsFormType }) => {
		const t = useTranslations('auth')
		const router = useRouter()
		const [captchaToken, setCaptchaToken] = useState<string | null>(null)
		const [formErrors, setFormErrors] = useState<
			z.ZodFormattedError<
				{
					email: string
					password: string
					phoneNumber?: string
					firstName?: string
					lastName?: string
					termsAccepted: boolean
					policyAccepted: boolean
				},
				string
			>
		>({ _errors: [] })
		const [captchaError, setCaptchaError] = useState<string | null>(null)

		const {
			login,
			data: loginData,
			loading: loginLoading,
			error: loginError
		} = useLoginMutation()
		const {
			signUp,
			data: signUpData,
			loading: signUpLoading,
			error: signUpError
		} = useSignUpMutation()

		const data = type === authConstants.SIGNUP ? signUpData : loginData
		const loading = type === authConstants.SIGNUP ? signUpLoading : loginLoading
		const error = type === authConstants.SIGNUP ? signUpError : loginError

		const [termsAccepted, setTermsAccepted] = useState(false)
		const [policyAccepted, setPolicyAccepted] = useState(false)

		useEffect(() => {
			if (loginData) {
				const userData = loginData.login
				setAuthUser(userData)
				saveTokenStorage(userData.accessToken)
			}
		}, [loginData])

		useEffect(() => {
			if (
				loginData?.login?.accessToken &&
				!loginError?.message?.length &&
				type === authConstants.LOGIN
			) {
				setTimeout(() => {
					router.push('/')
				}, 500)
			}
		}, [loginData, loginError, router, type])

		const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const form = new FormData(e.currentTarget)
			const formData = Object.fromEntries(form.entries())
			const formSchema =
				type === authConstants.SIGNUP ? formSignUpSchema : formLoginSchema
			const validationResult = formSchema.safeParse(formData) as any

			// Additional checkbox validation
			if (type === authConstants.SIGNUP) {
				if (!termsAccepted || !policyAccepted) {
					setFormErrors({
						...formErrors,
						_termsAccepted: !termsAccepted
							? ['You must accept the Terms and Conditions']
							: [],
						_policyAccepted: !policyAccepted
							? ['You must accept the Privacy Policy']
							: []
					})
					return
				}
			}

			// CAPTCHA validation
			if (!captchaToken) {
				setCaptchaError('You must complete the CAPTCHA validation')
				return
			} else {
				setCaptchaError(null)
			}

			if (!validationResult.success) {
				const errors = validationResult.error.format()
				setFormErrors(errors)
			} else {
				setFormErrors({ _errors: [] })
				logger.log('validationResult.data', validationResult.data)
				const variables = { input: { ...validationResult.data } }

				if (type === authConstants.SIGNUP) {
					signUp({ variables: variables as SignUpInput })
				} else {
					login({ variables: variables as LoginInput })
				}
			}
		}

		const isTermsInvalid = !!formErrors._termsAccepted?.length
		const isPolicyInvalid = !!formErrors._policyAccepted?.length

		return (
			<form
				onSubmit={onSubmit}
				className={classNames(cls.LoginForm, {}, [className])}
			>
				<InfoMessage error={error} data={data} type={type} />
				<RegistrationInputs type={type} formErrors={formErrors} />
				<BasicInputs formErrors={formErrors} />
				{type === authConstants.SIGNUP && (
					<div className={'ml-2 w-full'}>
						<CheckboxGroup
							className='w-full'
							isRequired
							isInvalid={isTermsInvalid || isPolicyInvalid}
							onValueChange={values => {
								setTermsAccepted(values.includes('termsAccepted'))
								setPolicyAccepted(values.includes('policyAccepted'))
							}}
						>
							<Checkbox
								size='lg'
								value='termsAccepted'
								className='w-full max-w-full text-lg flex items-start'
								classNames={{
									wrapper: 'after:bg-decor-2 min-w-[20px] min-h-[20px]'
								}}
							>
								{t('I accept the')}{' '}
								<Link href={getRouteOffer()} className='underline'>
									{t('Terms and Conditions')}
								</Link>
							</Checkbox>
							<Checkbox
								size='lg'
								className='w-full max-w-full text-lg flex items-start my-2'
								classNames={{
									wrapper: 'after:bg-decor-2 min-w-[20px] min-h-[20px]'
								}}
								value='policyAccepted'
							>
								{t('I accept the')}{' '}
								<Link href={getRoutePrivacy()} className='underline'>
									{t('Personal data processing policy')}
								</Link>
							</Checkbox>
						</CheckboxGroup>
					</div>
				)}

				{captchaError && (
					<p className='text-sm text-red-500'>
						{t('You must complete the CAPTCHA validation')}
					</p>
				)}

				<Turnstile
					siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
					onSuccess={token => {
						console.log('CAPTCHA token received:', token)
						setCaptchaToken(token)
						setCaptchaError(null)
					}}
					onExpire={() => {
						console.log('CAPTCHA token expired')
						setCaptchaToken(null)
						setCaptchaError('CAPTCHA token expired')
					}}
					onError={() => {
						console.error('CAPTCHA error occurred')
					}}
				/>

				<ButtonsForm type={type} setIsFormType={setIsFormType} />
			</form>
		)
	}
)

export default AuthForm
