import { Link } from '@/navigation'
import {
	getFAQRoute,
	getReviewRoute,
	getRouteAbout,
	getRouteContacts,
	getRouteOffer,
	getRoutePay,
	getRoutePrivacy,
	getSubscriptionsRoute
} from '@/shared/const/router'
import Logo from '@/shared/ui/Logo/Logo'

export const Footer = () => {
	return (
		<div className='bg-decor-4 text-accent py-8 px-4 md:px-16'>
			<div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left'>
				<div className='flex flex-col items-center md:items-start'>
					<Logo color='var(--main-color)' logoType='long' />
				</div>

				<div className='space-y-2'>
					<h3 className='text-lg font-semibold'>Разделы</h3>
					<ul className='space-y-1'>
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
				<div className='space-y-2'>
					<h3 className='text-lg font-semibold'>Связаться с нами</h3>
					<a href='mailto:support@whai.ru?subject=Вопрос'>support@whai.ru</a>
					<p>Присоединиться к нам в соцсетях:</p>
					<div className='flex justify-center md:justify-start space-x-4'>
						<Link href='https://vk.ru/whai_edu' className='underline'>
							ВКонтакте
						</Link>
						<Link href='https://t.me/whai_edu' className='underline'>
							Телеграм
						</Link>
					</div>
				</div>

				<div className='space-y-2'>
					<h3 className='text-lg font-semibold'>Whai 2024</h3>
					<ul className='space-y-1'>
						<li>
							<a href={getRouteOffer()} className='underline'>
								Договор оферты
							</a>
						</li>
						<li>
							<a href={getRoutePrivacy()} className='underline'>
								Политика конфиденциальности
							</a>
						</li>
						<li>ОГРНИП: 324750000037516</li>
						<li>ИНН: 753614213399</li>
						<li>ИП Горлачев Сергей Русланович</li>
						<li>Телефон для связи:+7 (993) 636 59-63</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
