import { Layout } from '@/widgets/Layout'
import BenefitSection from './blocks/Benefits/BenefitSection'
import HeroSection from './blocks/Hero/HeroSection'
import './main-page.scss'
import SVGLine from './SVGLine'

export default function MainPage() {
	return (
		<Layout>
			<HeroSection />
			<BenefitSection />
			<div className='w-screen h-screen'></div>
			<SVGLine /> {/* Линия размещается после других элементов */}
		</Layout>
	)
}
