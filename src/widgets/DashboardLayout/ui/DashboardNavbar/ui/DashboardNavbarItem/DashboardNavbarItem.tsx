import { Link } from '@/navigation'
import { DropdownItem } from '@/shared/ui/Dropdown/Dropdown'
import { dashboardNavbarItems } from '../../module/dashboard-navbar-items.data'

const DashboardNavbarItems = ({ userData }) => {
	return (
		<>
			{dashboardNavbarItems.map(item => (
				<DropdownItem
					key={item.key}
					className='h-14 gap-2'
					color={'white'}
					as={item.link ? Link : 'div'}
					href={item.link}
					onClick={item.onClick}
				>
					{item.icon && <item.icon className='mr-2' />}{' '}
					{item.text === 'Signed in as' ? (
						<>
							<p className='font-semibold'>{item.text}</p>
							<p className='font-semibold'>{userData.email}</p>
						</>
					) : (
						<p className='font-semibold'>{item.text}</p>
					)}
				</DropdownItem>
			))}
		</>
	)
}

export default DashboardNavbarItems
