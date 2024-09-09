'use client'
import { useScroll } from 'framer-motion'

const BenefitSection = () => {
	const { scrollY } = useScroll()

	return (
		<div
			className='benefit-section'
			style={{ position: 'relative', height: '100vh' }}
		>
			{/* Прокручиваемый контент */}
			<div
				className='content'
				style={{ padding: '2rem', position: 'relative', zIndex: 1 }}
			>
				<h1>Наши Преимущества</h1>
				<ul>
					<li>Высокое качество</li>
					<li>Инновационные решения</li>
					<li>Отличная поддержка клиентов</li>
					<li>Быстрая доставка</li>
				</ul>
			</div>
		</div>
	)
}

export default BenefitSection
