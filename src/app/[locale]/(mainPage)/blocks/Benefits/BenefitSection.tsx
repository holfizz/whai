'use client'
import TurboModeIcon from '@/shared/assets/icons/BenefitSection/turbo_mode'
import UnlimitedEducationIcon from '@/shared/assets/icons/BenefitSection/unlimited_education'
import CustomPathToSuccessIcon from '@/shared/assets/icons/BenefitSection/сustom_path_to_success'
import Shape11 from '@/shared/assets/icons/MainPage/shape-11'
import Shape21 from '@/shared/assets/icons/MainPage/shape-21'
import Shape24 from '@/shared/assets/icons/MainPage/shape-24'
import Shape4 from '@/shared/assets/icons/MainPage/shape-4'
import QuizShot from '@/shared/assets/image/QuizShot.webp'
import StartShot from '@/shared/assets/image/StartShot.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const BenefitSection = () => {
	const sectionRef = useRef(null)
	const shapesRef = useRef(null)

	useEffect(() => {
		const section = sectionRef.current
		const elements = section.querySelectorAll('.benefit-item')

		elements.forEach((element, index) => {
			const direction = index % 2 === 0 ? '30%' : '-30%'

			gsap.fromTo(
				element,
				{ x: direction, opacity: 0 },
				{
					x: '0%',
					opacity: 1,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 50%',
						end: 'top 30%',
						scrub: 1, // Smooth animation
						toggleActions: 'play none none reverse'
					}
				}
			)
		})

		const shapes = shapesRef.current?.querySelectorAll('svg')
		if (shapes) {
			const shape21 = shapesRef.current.querySelector('.shape21')
			const shape11 = shapesRef.current.querySelector('.shape11')
			const otherShapes = shapesRef.current.querySelectorAll(
				'svg:not(.shape21):not(.shape11)'
			)

			if (shape21) {
				gsap.fromTo(
					shape21,
					{ rotate: 0, x: -100, opacity: 0 },
					{
						rotate: 360,
						x: 0,
						opacity: 1,
						duration: 2,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: section,
							start: 'top top',
							end: 'bottom bottom',
							scrub: 1, // Smooth animation
							onUpdate: self => {
								const rotateValue = self.progress * 360
								const xValue = self.progress * 100
								gsap.to(shape21, {
									rotate: rotateValue,
									x: -100 + xValue
								})
							}
						}
					}
				)
			}

			if (shape11) {
				gsap.fromTo(
					shape11,
					{ rotate: 0, opacity: 0 },
					{
						rotate: 360,
						opacity: 1,
						duration: 2,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: section,
							start: 'top top',
							end: 'bottom bottom',
							scrub: 1, // Smooth animation
							onUpdate: self => {
								const rotateValue = self.progress * 360
								gsap.to(shape11, {
									rotate: rotateValue
								})
							}
						}
					}
				)
			}

			if (otherShapes.length) {
				gsap.fromTo(
					otherShapes,
					{ opacity: 0, y: 100 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.4,
						duration: 1,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: section,
							start: 'top top',
							end: 'bottom bottom',
							scrub: 1 // Smooth animation
						}
					}
				)
			}
		}
	}, [])

	return (
		<div
			ref={sectionRef}
			className='h-auto relative benefit-section z-10 flex flex-col items-center'
			style={{ padding: '2rem' }}
		>
			<div className='flex flex-col gap-10'>
				<div className='benefit-item flex items-center justify-end w-full gap-10 mx-auto z-10'>
					<img className='w-1/3' src={QuizShot.src} alt='Quiz'></img>
					<div className='flex flex-col gap-10'>
						<div className='w-[600px] bg-decor-4 rounded-[100px] flex gap-4 items-center justify-start p-4 md:px-8 md:py-6'>
							<CustomPathToSuccessIcon />
							<div className='flex flex-col'>
								<h1 className='font-bold text-xl md:text-2xl w-full'>
									Персонализированный путь к успеху
								</h1>
								<p className='mt-2 text-sm md:text-base text-secondary w-full'>
									Получите уникальную программу обучения, созданную ИИ
									специально для вас.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='benefit-item flex items-center justify-start w-full gap-10 mx-auto z-10'>
					<div className='w-[600px] bg-decor-4 rounded-[100px] flex gap-4 items-center justify-start p-4 md:px-8 md:py-6'>
						<UnlimitedEducationIcon />
						<div className='flex flex-col'>
							<h1 className='font-bold text-xl md:text-2xl w-full'>
								Безграничное обучение в вашем ритме
							</h1>
							<p className='mt-2 text-sm md:text-base text-secondary w-full'>
								Погрузитесь в мир знаний 24/7, где бы вы ни находились.
							</p>
						</div>
					</div>
					<img className='w-1/3' src={StartShot.src} alt='Quiz'></img>
				</div>
				<div className='benefit-item flex items-center justify-start w-full gap-10 mx-auto z-10'>
					<div className='w-[600px] bg-decor-4 rounded-[100px] flex gap-4 items-center justify-start p-4 md:px-8 md:py-6'>
						<TurboModeIcon />
						<div className='flex flex-col'>
							<h1 className='font-bold text-xl md:text-2xl w-full'>
								Турбо-режим для вашего развития
							</h1>
							<p className='mt-2 text-sm md:text-base text-secondary w-full'>
								Забудьте о медленном прогрессе! Наша ИИ-технология ускоряет ваше
								обучение.
							</p>
						</div>
					</div>
					<img className='w-1/3' src={QuizShot.src} alt='Quiz'></img>
				</div>
			</div>
			<div ref={shapesRef} className='absolute inset-0 pointer-events-none'>
				<Shape21
					className='shape21 absolute left-10 top-10 fill-error-1'
					width={100}
				/>
				<Shape4 className='absolute right-64 top-0 fill-yellow-5' width={100} />
				<Shape11
					fill='#8EBB8B'
					className='shape11 absolute left-20 bottom-10 fill-accent'
					width={50}
				/>
				<Shape24
					fill='#f2e4d4'
					className='absolute right-10 bottom-20 fill-yellow-1'
					width={80}
				/>
			</div>
		</div>
	)
}

export default BenefitSection
