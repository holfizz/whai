import { Link } from '@/navigation'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import NotFoundImage from '@/shared/assets/image/404.webp'
import { getRouteMain } from '@/shared/const/router'
import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { Layout } from '@/widgets/Layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export const metadata: Metadata = {
	title: 'Страница не найдена',
	description: 'Страница не найдена - Ошибка 404',
	...NO_INDEX_PAGE
}

export default function NotFound() {
	const t = useTranslations('NotFound')

	return (
		<Layout>
			<div className='w-screen h-screen flex flex-col items-center  p-4'>
				<div className='relative w-[40%] max-lg:w-[60%] max-md:w-[80%] max-sm:w-[90%] select-none pointer-events-none items-center'>
					<Image
						className=''
						src={NotFoundImage}
						alt='Page not found'
						layout='responsive'
						width={1000}
						height={800}
						objectFit='contain'
					/>
				</div>

				<Link
					href={getRouteMain()}
					className='text-2xl mt-4 flex items-center text-accent hover:underline'
				>
					{t('return to home')}
					<ArrowUpRight
						fontSize={32}
						className='ml-2 w-[32px] h-[32px] max-md:w-[24px] max-md:h-[24px]'
					/>
				</Link>
			</div>
		</Layout>
	)
}
