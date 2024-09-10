'use client'
import { useEffect, useRef } from 'react'
import './main-page.scss'

const SVGLine = () => {
	const pathRef = useRef<SVGPathElement | null>(null)
	const svgRef = useRef<SVGSVGElement | null>(null)

	useEffect(() => {
		const svg = svgRef.current
		const path = pathRef.current

		if (!svg || !path) return

		const updatePath = () => {
			const pathLength = path.getTotalLength()

			// Устанавливаем начальные значения для анимации
			path.style.strokeDasharray = pathLength.toString()
			path.style.strokeDashoffset = pathLength.toString()

			// Запускаем анимацию, только если страница загружена
			const handleScroll = () => {
				const scrollY = window.scrollY
				const viewportHeight = window.innerHeight
				const svgHeight = svg.clientHeight
				const scrollPercentage = scrollY / (svgHeight - viewportHeight)

				const clampedScrollPercentage = Math.min(
					Math.max(scrollPercentage, 0),
					1
				)
				path.style.strokeDashoffset = (
					pathLength *
					(1 - clampedScrollPercentage)
				).toString()
			}

			// Удаление мигания при загрузке
			svg.style.opacity = '1' // Показываем SVG только после загрузки

			window.addEventListener('scroll', handleScroll)

			return () => window.removeEventListener('scroll', handleScroll)
		}

		// Resize and update the path on window resize
		window.addEventListener('resize', updatePath)
		updatePath()

		// Clean up event listeners
		return () => {
			window.removeEventListener('resize', updatePath)
		}
	}, [])

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 1220.66 2000'
			preserveAspectRatio='none'
			className='squiggle'
			ref={svgRef}
		>
			<path
				ref={pathRef}
				d='M4.27 101c309.5 214 30.36 347.29 168.72 530.24 95.18 125.85 415.29 151.61 464.58-13.78 49.29-165.39-111.18-250.38-202.51-190.66-91.33 59.72-142.95 186.06-83.39 438.74 61.18 259.52-243.51 142.4-222.91 396.45 44.22 545.36 719 63.01 413-119.49-360.28-214.88-557.99 774 678.51 709.5'
				style={{
					stroke: '#FFF7DC',
					strokeLinejoin: 'round',
					strokeLinecap: 'round',
					strokeWidth: '15px',
					fill: 'none'
				}}
			/>
		</svg>
	)
}

export default SVGLine
