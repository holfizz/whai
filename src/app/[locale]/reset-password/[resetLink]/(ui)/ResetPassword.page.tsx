'use client'
import EyeCloseIcon from '@/shared/assets/icons/EyeClose'
import EyeOpenIcon from '@/shared/assets/icons/EyeOpen'
import Button from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/InputUI'
import { Layout } from '@/widgets/Layout'
import { gql, useMutation } from '@apollo/client'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const RESET_PASSWORD_MUTATION = gql`
	mutation resetPassword($dto: ResetPasswordInput!) {
		resetPassword(dto: $dto)
	}
`

const ResetPasswordPage = () => {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isVisibleOne, setIsVisibleOne] = useState(false)
	const [isVisibleTwo, setIsVisibleTwo] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION)
	const { resetLink } = useParams<{ resetLink: string }>()
	const toggleVisibilityOne = () => {
		setIsVisibleOne(!isVisibleOne)
	}
	const toggleVisibilityTwo = () => {
		setIsVisibleTwo(!isVisibleTwo)
	}

	const handleResetPassword = async () => {
		if (password !== confirmPassword) {
			setError('Пароли не совпадают')
			return
		}

		try {
			await resetPassword({
				variables: { dto: { token: resetLink, password } }
			})
			setSuccess('Пароль успешно сброшен!')
		} catch (err) {
			setError('Произошла ошибка при сбросе пароля')
		}
	}

	return (
		<Layout>
			<div className='flex flex-col items-center justify-center min-h-screen bg-bg-2 p-6'>
				<div className='w-full max-w-md p-8 bg-white rounded-[30px] shadow-lg'>
					<h1 className='text-3xl font-bold text-decor-2 mb-4 text-center'>
						Сброс пароля
					</h1>
					<p className='text-lg text-gray-700 mb-6 text-center'>
						Введите и подтвердите новый пароль. Убедитесь, что пароли совпадают.
						Если возникли проблемы, проверьте введённые данные и повторите
						попытку.
					</p>
					{error && <p className='mt-4 text-red-500 text-center'>{error}</p>}
					{success && (
						<p className='mt-4 text-green-500 text-center'>{success}</p>
					)}
					<div>
						<Input
							classNames={{
								innerWrapper: 'py-3 px-2 h-[60px]',
								inputWrapper: 'h-auto',
								input: 'text-xl pl-4'
							}}
							placeholder='Введите новый пароль'
							radius='roundedFull'
							endContent={
								<button
									className='focus:outline-none'
									type='button'
									onClick={toggleVisibilityOne}
								>
									{isVisibleOne ? (
										<EyeOpenIcon
											fontSize={24}
											className='text-2xl text-default-400 pointer-events-none'
										/>
									) : (
										<EyeCloseIcon
											fontSize={24}
											className='text-2xl text-default-400 pointer-events-none'
										/>
									)}
								</button>
							}
							type={isVisibleOne ? 'text' : 'password'}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Input
							classNames={{
								innerWrapper: 'py-3 px-2 h-[60px]',
								inputWrapper: 'h-auto',
								input: 'text-xl pl-4'
							}}
							className='mt-4'
							placeholder='Подтвердите новый пароль'
							radius='roundedFull'
							endContent={
								<button
									className='focus:outline-none'
									type='button'
									onClick={toggleVisibilityTwo}
								>
									{isVisibleTwo ? (
										<EyeOpenIcon
											fontSize={24}
											fill='text-default-400'
											className='text-2xl text-default-400 '
										/>
									) : (
										<EyeCloseIcon
											fontSize={24}
											fill='text-default-400'
											className='text-lg text-default-400 pointer-events-none'
										/>
									)}
								</button>
							}
							type={isVisibleTwo ? 'text' : 'password'}
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
						<Button
							size='xl'
							onClick={handleResetPassword}
							className='w-full py-3 font-bold rounded-full text-white bg-decor-2 mt-20'
							disabled={loading}
						>
							{loading ? 'Сброс пароля...' : 'Сбросить пароль'}
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ResetPasswordPage
