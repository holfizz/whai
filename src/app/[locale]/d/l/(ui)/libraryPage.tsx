'use client'

import Button from '@/shared/ui/Button/Button'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import cls from './libraryPage.module.scss'
import CourseSection from './section/CourseSection'
import LessonSection from './section/LessonSection'
import TestSection from './section/TestSection'

const VALID_VIEW_TYPES = ['courses', 'tests', 'lessons']

const LibraryPage = () => {
	const t = useTranslations('CoursesPage')
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// Get 'view' query parameter or default to 'courses'
	const initialViewType = searchParams.get('view') || 'courses'
	const [viewType, setViewType] = useState(initialViewType)

	useEffect(() => {
		// Validate the 'view' query parameter and default to 'courses' if invalid
		if (!VALID_VIEW_TYPES.includes(initialViewType)) {
			setViewType('courses')
			// Optionally update the URL to default to 'courses'
			router.replace(`${pathname}?view=courses`)
		} else {
			setViewType(initialViewType)
		}
	}, [initialViewType, pathname, router])

	const updateViewType = (type: string) => {
		if (!VALID_VIEW_TYPES.includes(type)) {
			type = 'courses'
		}
		setViewType(type)

		// Create a new URLSearchParams object from the current search parameters
		const currentParams = new URLSearchParams(
			Array.from(searchParams.entries())
		)

		// Update the 'view' parameter with the new type
		currentParams.set('view', type)

		// Convert the parameters to a string and update the URL
		const queryString = currentParams.toString()
		const newUrl = queryString ? `${pathname}?${queryString}` : pathname

		router.push(newUrl)
	}

	const renderContent = () => {
		switch (viewType) {
			case 'courses':
				return <CourseSection />
			case 'tests':
				return <TestSection />
			case 'lessons':
				return <LessonSection />
			default:
				return <CourseSection /> // Fallback
		}
	}

	return (
		<DashboardLayout>
			<Text
				size={TextSize.XL}
				title={t('Library')}
				classNameText={cls.text}
				text={t('Choose what to view')}
			/>
			<div className='flex gap-4 mb-4'>
				<Button
					size='md'
					color={viewType === 'courses' ? 'secondary' : 'gray'}
					className={`btn ${viewType === 'courses' ? 'btn-active' : ''}`}
					onClick={() => updateViewType('courses')}
				>
					{t('Courses')}
				</Button>
				<Button
					color={viewType === 'tests' ? 'secondary' : 'gray'}
					className={`btn ${viewType === 'tests' ? 'btn-active' : ''}`}
					onClick={() => updateViewType('tests')}
				>
					{t('Tests')}
				</Button>
				<Button
					color={viewType === 'lessons' ? 'secondary' : 'gray'}
					className={`btn ${viewType === 'lessons' ? 'btn-active' : ''}`}
					onClick={() => updateViewType('lessons')}
				>
					{t('Lessons')}
				</Button>
			</div>
			<div className='flex flex-wrap gap-5 w-full items-center max-640:p-8 max-640:w-full'>
				{renderContent()}
			</div>
		</DashboardLayout>
	)
}

export default LibraryPage
