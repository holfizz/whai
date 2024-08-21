import { useTranslations } from 'next-intl'
import { useSidebar } from '../../module/sidebar.module'

const SidebarFooter = () => {
	const t = useTranslations('Sidebar')
	const { isCollapsed } = useSidebar()
	return (
		<div className='w-full h-[100px] flex flex-col items-center justify-center gap-4 mb-8'>
			<div className='flex w-full items-center justify-evenly text-secondary'>
				{!isCollapsed && (
					<h3 className='max-w-1/2 text-ellipsis overflow-hidden'>
						{t('Generations of courses')}
					</h3>
				)}
				<div className='w-[40px] h-[40px] rounded-md text-accent flex justify-center items-center bg-bg-accent'>
					5
				</div>
			</div>
			<div className='flex w-full items-center justify-evenly text-secondary'>
				{!isCollapsed && <h3>{t('Block generation')}</h3>}
				<div className='w-[40px] h-[40px] rounded-md text-accent flex justify-center items-center bg-decor-1'>
					20
				</div>
			</div>
		</div>
	)
}
export default SidebarFooter
