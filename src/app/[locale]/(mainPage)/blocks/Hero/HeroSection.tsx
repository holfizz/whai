'use client'

import Shape12 from '@/shared/assets/icons/HeroSection/shape-12'
import Shape14 from '@/shared/assets/icons/HeroSection/shape-14'
import Shape17 from '@/shared/assets/icons/HeroSection/shape-17'
import Shape18 from '@/shared/assets/icons/HeroSection/shape-18'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef } from 'react'
import './HeroSection.scss'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
	const t = useTranslations('MainPage')

	const textRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLDivElement>(null)
	const shapesRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const elements = textRef.current?.querySelectorAll('span.hidden-word')
		if (elements) {
			gsap.fromTo(
				elements,
				{
					opacity: 0,
					filter: 'blur(20px)',
					y: 50
				},
				{
					opacity: 1,
					filter: 'blur(0px)',
					y: 0,
					stagger: 0.3,
					duration: 1,
					ease: 'power2.out'
				}
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textRef.current])

	useEffect(() => {
		const buttons = buttonRef.current?.querySelectorAll('button')
		if (buttons) {
			gsap.fromTo(
				buttons,
				{
					opacity: 0,
					scale: 0.9,
					y: 50
				},
				{
					opacity: 1,
					scale: 1,
					y: 0,
					stagger: 0.2,
					duration: 0.8,
					ease: 'power2.out'
				}
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buttonRef.current])

	useEffect(() => {
		// Animations for shapes
		const shapes = shapesRef.current?.querySelectorAll('svg')
		if (shapes) {
			gsap.fromTo(
				shapes,
				{
					opacity: 0,
					y: 100,
					rotate: 0
				},
				{
					opacity: 1,
					y: 0,
					rotate: 360,
					stagger: 0.4,
					duration: 1,
					ease: 'power2.out'
				}
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shapesRef.current])

	const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
		const button = event.currentTarget
		gsap.to(button, {
			duration: 0.3,
			scale: 1.1,
			ease: 'power2.out'
		})
	}

	const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
		const button = event.currentTarget
		gsap.to(button, {
			duration: 0.3,
			scale: 1,
			zIndex: 6,
			ease: 'power2.out'
		})
		gsap.to(button, {
			duration: 0.3,
			x: 0,
			y: 0,
			zIndex: 6,
			ease: 'power2.out'
		})
	}

	const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
		const button = event.currentTarget
		const { clientX, clientY } = event
		const { innerWidth, innerHeight } = window
		const { left, top, width, height } = button.getBoundingClientRect()
		const centerX = width / 2
		const centerY = height / 2

		gsap.to(button, {
			x: (clientX - innerWidth / 2) * 0.1,
			y: (clientY - innerHeight / 2) * 0.1,
			duration: 0.3,
			ease: 'power2.out',
			overwrite: true
		})
	}

	return (
		<div className='MainPageFirstBlock relative'>
			<div
				ref={textRef}
				className='main-page-heading text-[60px] font-extrabold mt-20 w-[760px]'
			>
				<div className='top-row'>
					<span className='hidden-word'>Откройте</span>
					<span className='hidden-word'>безграничный</span>
				</div>
				<div className='bottom-row'>
					<span className='hidden-word'>потенциал</span>
					<span className='hidden-word'>обучения</span>
				</div>
			</div>
			<div
				ref={buttonRef}
				className='relative w-[760px] flex gap-5 mt-10 items-center justify-center z-10'
			>
				<button
					className='w-[40%] h-[80px] bg-accent text-white rounded-[40px] relative'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onMouseMove={handleMouseMove}
				>
					{t('Start for free')}
				</button>
				<button
					className='w-[40%] h-[80px] bg-transparent hover:bg-decor-2 text-accent rounded-[40px] relative border-2 border-solid border-decor-2'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onMouseMove={handleMouseMove}
				>
					{t('Watch video')}
				</button>
			</div>
			<div ref={shapesRef}>
				<Shape18
					className='absolute left-10 top-[-30px] fill-error-1'
					width={100}
				/>
				<Shape12
					className='absolute right-10 top-36 fill-yellow-5'
					width={100}
				/>
				<Shape14
					className='absolute right-40 bottom-4 fill-accent'
					width={50}
				/>
				<Shape17
					className='absolute left-20 bottom-40 fill-yellow-1'
					width={80}
				/>
			</div>
		</div>
	)
}

export default HeroSection
