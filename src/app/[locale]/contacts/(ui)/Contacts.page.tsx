import { Link } from '@/navigation'
import ChatIcon from '@/shared/assets/icons/Chat'
import TelegramIcon from '@/shared/assets/icons/Telegram'
import VKIcon from '@/shared/assets/icons/VK'
import { Layout } from '@/widgets/Layout'
import { useTranslations } from 'next-intl'

const ContactsPage = () => {
	const t = useTranslations('Contacts')
	return (
		<Layout>
			<div className='w-full flex justify-center items-center'>
				<div className='w-[80%] my-8'>
					<div>
						<div className='flex gap-2 items-start'>
							<div className='border-solid border-1 border-secondary p-2 w-min rounded-[10px]'>
								<ChatIcon fill='#bbb9b7' />
							</div>
							<div className='flex flex-col'>
								{t('Chat to us')}
								<p className='text-sm text-secondary'>
									{t('Our friendly team is here to help')}
								</p>
								<a
									className='text-sm text-accent underline'
									href='mailto:support@whai.ru'
								>
									support@whai.ru
								</a>
							</div>
						</div>
						<h2 className='text-lg font-medium mt-4'>
							{t('Grow deeper in our social networks')}:
						</h2>
						<div className='flex gap-4'>
							<Link href='https://t.me/whai_edu'>
								<TelegramIcon fontSize={32} fill='#bbb9b7' />
							</Link>
							<Link href='https://vk.ru/whai_edu'>
								<VKIcon fontSize={34} fill='#bbb9b7' />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
export default ContactsPage
