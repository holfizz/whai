'use client'
import { Layout } from '@/widgets/Layout'
import { useRef } from 'react'
import HeroSection from './blocks/Hero/HeroSection'
import HowUse from './blocks/HowUse/HowUse'
import PricingSection from './blocks/Pricing/PricingSection'
import './main-page.scss'

export default function MainPage() {
	const videoRef = useRef<HTMLDivElement>(null)

	const scrollToVideo = () => {
		videoRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<Layout>
			<HeroSection />
			<HowUse />
			<PricingSection />
			{/* <BenefitSection /> */}
			{/* <ComparisonSection />
			<div ref={videoRef}>
				<Video />
			</div>
			<SVGLine /> */}
		</Layout>
	)
}
