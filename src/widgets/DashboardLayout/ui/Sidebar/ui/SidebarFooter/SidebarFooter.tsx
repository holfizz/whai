import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { Tooltip } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useSidebar } from '../../module/sidebar.module'

const SidebarFooter = () => {
	const t = useTranslations('Sidebar')
	const { isCollapsed } = useSidebar()
	const { userData } = useGetProfile()

	return (
		<div className='w-full h-auto flex flex-col items-center justify-center gap-4 mb-4 px-4'>
			<Tooltip
				classNames={{
					content: ['py-2 px-4 shadow-xl', 'text-black bg-bg-accent']
				}}
				placement={'right-end'}
				content={
					<div className='px-1 py-2'>
						<div className='flex gap-2 items-center'>
							<h1 className='font-bold'>{t('Generations of courses')}:</h1>
							<p>{Number(userData?.currentCourseCount)}</p>
						</div>
						<div className='flex gap-2 items-center'>
							<h1 className='font-bold'>{t('Generations of lessons')}:</h1>
							<p>{Number(userData?.currentLessonCount)}</p>
						</div>
						<div className='flex gap-2 items-center'>
							<h1 className='font-bold'>{t('Block generation')}:</h1>
							<p>{Number(userData?.additionalTitlesCount)}</p>
						</div>
					</div>
				}
			>
				<div
					className={`flex w-full items-center  ${
						isCollapsed ? 'justify-center' : 'justify-evenly'
					} text-secondary`}
				>
					{!isCollapsed && <h3>{t('Generations')}</h3>}
					<div className='w-[40px] h-[40px] rounded-md text-accent flex justify-center items-center bg-bg-accent'>
						{Number(userData?.currentLessonCount) +
							Number(userData?.additionalTitlesCount) +
							Number(userData?.currentCourseCount)}
					</div>
				</div>
			</Tooltip>
		</div>
	)
}
export default SidebarFooter
