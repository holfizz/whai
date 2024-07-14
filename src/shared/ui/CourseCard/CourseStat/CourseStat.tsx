import Icon from '@/shared/ui/Icon/Icon'
import { BsPerson } from 'react-icons/bs'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { Clock4 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ICourse } from '@/entities/course'

const CourseStat = ({
	data,
	className
}: {
	data: ICourse
	className?: string
}) => {
	const t = useTranslations('Dashboard')
	return (
		<div className={`flex w-[300px] justify-between mt-4 ${className}`}>
			<div className={'flex text-2xl items-center'}>
				<Icon color={'var(--color-accent)'} SVG={BsPerson} />
				<Text size={TextSize.L} text={`${data?.totalTopics} ${t('topics')}`} />
			</div>
			<div className={'flex items-center'}>
				<Icon className={'stroke-[var(--color-accent)]'} SVG={Clock4} />
				<Text text={`${data?.completionTime} ${t('hours')}`} />
			</div>
		</div>
	)
}

export default CourseStat
