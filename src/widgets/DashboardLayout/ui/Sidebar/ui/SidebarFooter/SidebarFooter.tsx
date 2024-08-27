import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { useTranslations } from 'next-intl'
import { useSidebar } from '../../module/sidebar.module'

const SidebarFooter = () => {
	const t = useTranslations('Sidebar')
	const { isCollapsed } = useSidebar()
	const { userData } = useGetProfile()

	return (
		<div className='w-full h-[100px] flex flex-col items-center justify-center gap-4 mb-16 px-4'>
			<div
				className={`flex w-full items-center ${
					isCollapsed ? 'justify-center' : 'justify-between '
				} text-secondary `}
			>
				{!isCollapsed && (
					<h3 className='max-w-1/2 text-ellipsis overflow-hidden'>
						{t('Generations of courses')}
					</h3>
				)}
				<div className='w-[40px] h-[40px] rounded-md text-accent flex justify-center items-center bg-white'>
					{userData?.currentCourseCount}
				</div>
			</div>
			<div
				className={`flex w-full items-center  ${
					isCollapsed ? 'justify-center' : 'justify-between'
				} text-secondary`}
			>
				{!isCollapsed && <h3>{t('Generations of lessons')}</h3>}
				<div className='w-[40px] h-[40px] rounded-md text-accent flex justify-center items-center bg-bg-accent'>
					{userData?.currentLessonCount}
				</div>
			</div>
			<div
				className={`flex w-full items-center ${
					isCollapsed ? 'justify-center' : 'justify-between '
				} text-secondary`}
			>
				{!isCollapsed && <h3>{t('Block generation')}</h3>}
				<div className='w-[40px] h-[40px] rounded-md text-accent flex justify-center items-center bg-decor-1'>
					{userData?.additionalTitlesCount}
				</div>
			</div>
		</div>
	)
}
export default SidebarFooter
