'use client'

import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { gql, useQuery } from '@apollo/client'
import {
	CategoryScale,
	ChartData,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Tooltip
} from 'chart.js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

// Define the GraphQL queries
const GET_REGISTRATIONS_BY_MONTH = gql`
	query getUserRegistrationsByMonth {
		getUserRegistrationsByMonth {
			month
			count
		}
	}
`

const GET_USER_COUNTS = gql`
	query getUserCounts {
		getUserCounts {
			name
			value
		}
	}
`

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
)

const AdmpPage = () => {
	const { userData, loading } = useGetProfile()
	const router = useRouter()
	const [isAuthorized, setIsAuthorized] = useState(false)

	useEffect(() => {
		if (!loading && userData) {
			const hasAdminRole = userData?.roles?.includes('ADMIN')

			if (!hasAdminRole) {
				router.push('/404')
			} else {
				setIsAuthorized(true) // User has admin role, show the page
			}
		}
	}, [userData, loading, router])

	// Fetch registrations by month
	const { data: registrationsData, loading: chartLoading } = useQuery(
		GET_REGISTRATIONS_BY_MONTH,
		{
			skip: !isAuthorized // Skip the query until the user is authorized
		}
	)

	// Fetch user counts
	const { data: userCountsData, loading: countsLoading } = useQuery(
		GET_USER_COUNTS,
		{
			skip: !isAuthorized // Skip the query until the user is authorized
		}
	)

	const chartData: ChartData<'line', number[], string> | null =
		registrationsData
			? {
					labels: registrationsData.getUserRegistrationsByMonth.map(
						item => item.month
					),
					datasets: [
						{
							label: 'Число регистраций',
							data: registrationsData.getUserRegistrationsByMonth.map(
								item => item.count
							),
							borderColor: '#ffb57f', // Use your desired color
							tension: 0.1
						}
					]
			  }
			: null

	if (loading || !userData || !isAuthorized || countsLoading) {
		// Show loader until we have finished role verification
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh'
				}}
			>
				<BigDotsLoader />
			</div>
		)
	}

	return (
		<DashboardLayout>
			<div className='user-counts w-full flex gap-4 items-center'>
				<h2>User Statistics</h2>
				{userCountsData &&
					userCountsData.getUserCounts.map(count => (
						<div
							className='w-[300px] h-[50px] bg-decor-1 rounded-lg p-4 flex items-center'
							key={count.name}
						>
							<strong>{count.name}:</strong> {count.value}
						</div>
					))}
			</div>
			<div className='mt-8'>
				{chartLoading ? (
					<BigDotsLoader />
				) : chartData ? (
					<Line data={chartData} className='mb-6' />
				) : null}
			</div>
		</DashboardLayout>
	)
}

export default AdmpPage
