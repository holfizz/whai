import { Link } from '@/navigation'
import TelegramIcon from '@/shared/assets/icons/Telegram'
import VKIcon from '@/shared/assets/icons/VK'
import {
	getFAQRoute,
	getReviewRoute,
	getRouteAbout,
	getRouteContacts,
	getRouteCookiePolicy,
	getRouteOffer,
	getRoutePay,
	getRoutePrivacy,
	getSubscriptionsRoute
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import Logo from '@/shared/ui/Logo/Logo'
import { useTranslations } from 'next-intl'

export const Footer = () => {
	const t = useTranslations('Layout')
	return (
		<div className='bg-decor-4 text-accent py-8 px-4 md:px-16 z-50'>
			<div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left'>
				<div className='flex flex-col items-start md:items-start '>
					<Logo color='var(--main-color)' isDashboard={false} />
					<p
						className='text-sm text-secondary w-[170px] mt-2
				max-md:text-left'
					>
						{t('Where every lesson is a step into the future')}
					</p>
				</div>

				<div className='space-y-2 flex flex-col items-start '>
					<h3 className='text-lg font-semibold'>Разделы</h3>
					<ul className='space-y-1 flex flex-col items-start '>
						<li>
							<Link href={getFAQRoute()}>FAQ</Link>
						</li>
						<li>
							<Link href={getRouteAbout()}>О нас</Link>
						</li>
						<li>
							<Link href={getRouteContacts()}>Контакты</Link>
						</li>
						<li>
							<Link href={getRoutePay()}>Способы оплаты</Link>
						</li>
						<li>
							<Link href={getReviewRoute()}>Отзывы</Link>
						</li>
						<li>
							<Link href={getSubscriptionsRoute()}>Подписки</Link>
						</li>
					</ul>
				</div>

				{/* Column 3: Contact and Social Media */}
				<div className='space-y-2 flex flex-col items-start '>
					<h3 className='text-lg font-semibold'>Связаться с нами</h3>
					<a href='mailto:support@whai.ru?subject=Вопрос' className='underline'>
						support@whai.ru
					</a>
					<a href={'tel:+7 (993) 636 59-63'} className='underline'>
						+7 (993) 636 59-63
					</a>
				</div>

				<div className='space-y-2 flex flex-col items-start '>
					<h3 className='text-lg font-semibold'>Whai 2024</h3>
					<ul className='space-y-1 flex flex-col items-start '>
						<li>
							<Link href={getRouteOffer()} className='underline'>
								Договор оферты
							</Link>
						</li>
						<li>
							<Link href={getRoutePrivacy()} className='underline'>
								Политика конфиденциальности
							</Link>
						</li>
						<li>
							<Link href={getRouteCookiePolicy()} className='underline'>
								Политика Cookies
							</Link>
						</li>
						<li>ОГРНИП: 324750000037516</li>
						<li>ИНН: 753614213399</li>
						<li>ИП Горлачев Сергей Русланович</li>
					</ul>
					<Button color='accent' style={{ marginTop: '30px' }}>
						<Link href={getSubscriptionsRoute()}>Отмена подписки</Link>
					</Button>
				</div>
			</div>
			<div className='w-full h-0.5 bg-secondary rounded-sm my-8' />
			<div className='w-full flex justify-between items-center'>
				<h3 className='text-secondary text-sm'>©2024 Whai</h3>

				<div className='flex gap-4 w-max'>
					<Link href='https://vk.ru/whai_edu'>
						<TelegramIcon fontSize={32} fill='#bbb9b7' />
					</Link>
					<Link href='https://t.me/whai_edu'>
						<VKIcon fontSize={34} fill='#bbb9b7' />
					</Link>
				</div>
			</div>
		</div>
	)
}
