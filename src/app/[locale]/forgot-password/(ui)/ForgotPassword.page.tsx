'use client'
import Button from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/InputUI'
import { Layout } from '@/widgets/Layout'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

const FORGOT_PASSWORD_MUTATION = gql`
	mutation forgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('')
	const [forgotPassword, { loading, error, data }] = useMutation(
		FORGOT_PASSWORD_MUTATION
	)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		await forgotPassword({ variables: { email } })
	}

	return (
		<Layout>
			<div className='flex flex-col items-center justify-center min-h-screen bg-bg-2 p-6'>
				<div className='w-full max-w-md p-8 bg-white rounded-[30px] shadow-lg'>
					<h1 className='text-3xl font-bold text-decor-2 mb-4 text-center'>
						Восстановление пароля
					</h1>
					<p className='text-lg text-gray-700 mb-6 text-center'>
						Пожалуйста, введите ваш адрес электронной почты. Мы отправим вам
						ссылку для восстановления пароля.
					</p>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<Input
							classNames={{
								innerWrapper: 'py-3 px-2 h-[60px]',
								inputWrapper: 'h-auto',
								input: 'text-xl pl-4'
							}}
							name='email'
							isRequired
							radius={'roundedFull'}
							isClearable
							type='email'
							color='white'
							onValueChange={setEmail}
							placeholder='Введите ваш email'
						/>
						<Button
							type='submit'
							color='accent'
							size='xl'
							className='w-auto py-3 font-bold rounded-full text-white bg-decor-2 '
							disabled={loading}
						>
							Восстановить
						</Button>
					</form>
					{error && (
						<p className='mt-4 text-red-500 text-center'>{error.message}</p>
					)}
					{data && (
						<p className='mt-4 text-green-500 text-center'>
							Если ваш email зарегистрирован, вы получите письмо с инструкциями
							по восстановлению пароля.
						</p>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default ForgotPasswordPage
