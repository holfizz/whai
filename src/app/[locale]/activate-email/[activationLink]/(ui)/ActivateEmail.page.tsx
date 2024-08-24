'use client'
import { Link } from '@/navigation'
import Button from '@/shared/ui/Button/Button'
import { Layout } from '@/widgets/Layout'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import Confetti from 'react-confetti'

const IS_ACTIVATED_QUERY = gql`
	query IsActivated($activationLink: ActivationLinkInput!) {
		isActivated(activationLink: $activationLink)
	}
`

const ActivateEmailPage = () => {
	const { activationLink } = useParams<{ activationLink: string }>()

	const { loading, error, data } = useQuery(IS_ACTIVATED_QUERY, {
		variables: {
			activationLink: {
				activationLink
			}
		}
	})

	return (
		<Layout>
			<div className='flex flex-col items-center justify-center min-h-screen bg-bg-2 p-6'>
				{data?.isActivated ? (
					<div className='relative p-8 bg-white rounded-[30px] shadow-lg text-center max-w-md mx-auto'>
						<h1 className='text-4xl font-bold text-decor-2 mb-4'>
							Ваш аккаунт активирован успешно!
						</h1>

						<p className='text-lg text-gray-700 mb-4'>
							Ваш аккаунт успешно активирован. Воспользуйтесь своей учетной
							записью, чтобы продолжить знакомство с нашей платформой и
							открывать для себя новые возможности.
						</p>

						<div className='w-full flex justify-center items-center mt-8'>
							<Button
								as={Link}
								href='/'
								color='accent'
								size='xl'
								className='rounded-3xl w-auto'
							>
								Вернутся на главную
							</Button>
						</div>
					</div>
				) : (
					<div className='p-8 bg-white rounded-lg shadow-lg text-center max-w-md mx-auto'>
						<h1 className='text-2xl font-bold text-error-10 mb-4'>
							Возможно, ссылка уже была активирована или её не существует
						</h1>
						<p className='text-lg text-gray-700 mt-4'>
							Пожалуйста, проверьте ссылку и попробуйте снова. Если вы не
							регистрировались на нашем сервисе, пожалуйста, проигнорируйте это
							сообщение. Если у вас возникли вопросы, свяжитесь с нашей
							поддержкой по адресу{' '}
							<a
								href='mailto:support@whai.ru'
								className='text-blue-500 underline'
							>
								support@whai.ru
							</a>
							.
						</p>
						<div className='w-full flex justify-center items-center mt-8'>
							<Button color='accent' size='xl' className='rounded-3xl w-auto'>
								Вернутся на главную
							</Button>
						</div>
					</div>
				)}
			</div>
			{data?.isActivated && <Confetti recycle={false} />}
		</Layout>
	)
}

export default ActivateEmailPage
