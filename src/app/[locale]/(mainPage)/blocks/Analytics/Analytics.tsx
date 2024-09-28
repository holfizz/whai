'use client'

import AnalyticsIcon from '@/shared/assets/icons/Analytics'
import TextIcon from '@/shared/assets/icons/Text'
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip
} from 'chart.js'
import { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import './Analytics.scss'

// Register necessary components for Chart.js
ChartJS.register(
	LinearScale,
	CategoryScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
)

const Analytics = () => {
	const [chartVisible, setChartVisible] = useState(false)
	const [fillPercentage, setFillPercentage] = useState(0)
	const chartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				const entry = entries[0]
				if (entry.isIntersecting) {
					setChartVisible(true)
					animateChartFill()
					observer.disconnect() // Disconnect to trigger animation only once
				}
			},
			{ threshold: 0.1 } // Triggers when 10% of the element is visible
		)

		if (chartRef.current) {
			observer.observe(chartRef.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [])

	const animateChartFill = () => {
		let currentFill = 0
		const targetFill = 70
		const animationDuration = 2000
		const animationFrame = 60
		const increment = targetFill / (animationDuration / (1000 / animationFrame))

		const fill = () => {
			if (currentFill < targetFill) {
				currentFill += increment
				setFillPercentage(Math.min(currentFill, targetFill))
				requestAnimationFrame(fill)
			}
		}

		requestAnimationFrame(fill)
	}

	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
		datasets: [
			{
				label: 'Performance',
				data: [10, 30, 20, 80, 50, 40, 10],
				fill: true,
				backgroundColor: 'rgba(0, 0, 0, 0)', // Цвет фона области
				borderColor: 'black',
				borderWidth: 3,
				pointRadius: 5,
				pointBackgroundColor: context => {
					const value = context.dataset.data[context.dataIndex]
					return value === 80 ? 'white' : 'black'
				},
				tension: 0.4
			}
		]
	}

	const options = {
		responsive: true,
		scales: {
			y: {
				display: false,
				grid: {
					display: false
				}
			},
			x: {
				display: false,
				grid: {
					display: false
				}
			}
		},
		plugins: {
			legend: {
				display: false
			},
			annotation: {
				// Добавление плагина аннотации
				annotations: {
					label: {
						type: 'label',
						x: 'Apr', // Место на оси X
						y: 80, // Место на оси Y
						content: ['whai'],
						font: {
							size: 12
						},
						anchor: 'end'
					}
				}
			}
		}
	}

	const chartInstanceRef = useRef(null)

	return (
		<div className='relative mt-8 w-full flex flex-col items-center h-[700px]'>
			<h1 className='text-3xl font-bold text-center'>
				Следим за вашей
				<br /> успеваемостью
			</h1>
			<div className='absolute w-[80%]'>
				<div className='relative w-[300px] left-10 top-8'>
					<div className='w-[220px] h-[60px] rounded-[30px] bg-decor-3 px-2 flex items-center gap-8 absolute right-[-80px] mt-10 z-10'>
						<div className='w-[50px] h-[50px] rounded-full bg-accent flex items-center justify-center'>
							<TextIcon />
						</div>
						<span className='text-yellow-5'>Русский язык</span>
					</div>
					<div className='mt-4 relative' ref={chartRef}>
						<div className='relative w-[250px] h-[250px]'>
							<div
								className={`circle flex items-center justify-center ${
									chartVisible ? 'animate' : ''
								}`}
								style={{
									background: `conic-gradient(#DEDEDEFF 0% ${fillPercentage}%, #f8f8f8 ${fillPercentage}% 100%)`
								}}
							>
								<div className='inner-circle'></div>
							</div>
						</div>
					</div>
				</div>
				<div className='relative left-1/3 top-12'>
					<div className='w-[200px] h-[60px] rounded-[30px] bg-decor-3 px-2 flex items-center gap-8 left-[-150px] mt-12 z-20 absolute'>
						<div className='w-[50px] h-[50px] rounded-full bg-accent flex items-center justify-center'>
							<AnalyticsIcon />
						</div>
						<span className='text-yellow-5'>Аналитик</span>
					</div>
					<div className='w-[400px] h-[300px] bg-bg-accent rounded-3xl p-4'>
						<Line data={data} options={options} ref={chartInstanceRef} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Analytics
