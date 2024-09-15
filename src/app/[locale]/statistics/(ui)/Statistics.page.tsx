import WarnIcon from '@/shared/assets/icons/Warn'
import { DashboardLayout } from '@/widgets/DashboardLayout'

const StatisticsPage = () => {
	return (
		<DashboardLayout>
			<div className='h-screen w-screen flex '>
				<div className={'flex gap-5'}>
					<WarnIcon />
					<h1 className='text-2xl'>Страница пока что не доступна</h1>
				</div>
			</div>
		</DashboardLayout>
	)
}
export default StatisticsPage
