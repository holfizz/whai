import { ICourse } from '@/entities/course'
import ClockIcon from '@/shared/assets/icons/Clock'
import ListIcon from '@/shared/assets/icons/List'
import Icon from '@/shared/ui/Icon/Icon'

import { useTranslations } from 'next-intl'
const CourseStat = ({
	data,
	className
}: {
	data: ICourse
	className?: string
}) => {
	const t = useTranslations('Dashboard')
	return (
		<div
			className={`flex w-[300px] justify-between mt-4 max-md:w-1/2 ${className}`}
		>
			<div className={'flex items-center'}>
				<Icon className={'fill-gray-2 mr-2'} SVG={ClockIcon} />
				<h2 className='text-sm text-gray-2'>
					{data?.completionTime} {t('hours')}
				</h2>
			</div>
			<div className={'flex text-2xl items-center'}>
				<Icon className={'mr-2'} SVG={ListIcon} />
				<h2 className='text-sm text-gray-2'>
					{data?.totalTopics} {t('topics')}
				</h2>
			</div>
		</div>
	)
}

export default CourseStat
