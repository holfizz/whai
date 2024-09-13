'use client'
import { Layout } from '@/widgets/Layout'
import { useRef } from 'react'
import BenefitSection from './blocks/Benefits/BenefitSection'
import ComparisonSection from './blocks/Comparison/ComparisonSection'
import HeroSection from './blocks/Hero/HeroSection'
import Video from './blocks/Video/Video'
import './main-page.scss'
import SVGLine from './SVGLine'

export default function MainPage() {
	const videoRef = useRef<HTMLDivElement>(null)

	const scrollToVideo = () => {
		videoRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<Layout>
			<HeroSection scrollToVideo={scrollToVideo} />
			<BenefitSection />
			<ComparisonSection />
			<div ref={videoRef}>
				<Video />
			</div>
			<SVGLine />
		</Layout>
	)
}
