import { Layout } from '@/widgets/Layout'
import BenefitSection from './blocks/Benefits/BenefitSection'
import HeroSection from './blocks/Hero/HeroSection'
import './main-page.scss'

const SVGLine = () => (
	<svg
		width='100%'
		height='3000'
		viewBox='0 0 100 3000'
		xmlns='http://www.w3.org/2000/svg'
		style={{ position: 'absolute', top: 0, left: 0 }}
	>
		<path
			d='M0 0 L100 3000'
			stroke='currentColor'
			strokeWidth='18'
			strokeMiterlimit='10'
			strokeLinecap='round'
			fill='none'
		/>
	</svg>
)

export default function MainPage() {
	return (
		<Layout>
			<HeroSection />
			<BenefitSection />
		</Layout>
	)
}
