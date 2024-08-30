'use client'

import Button from '@/shared/ui/Button/Button'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import cls from './libraryPage.module.scss'
import CourseSection from './section/CourseSection'
import TestSection from './section/TestSection'

const LibraryPage = () => {
	const t = useTranslations('CoursesPage')
	const [viewType, setViewType] = useState('courses')

	const renderContent = () => {
		switch (viewType) {
			case 'courses':
				return <CourseSection />
			// case 'lessons':
			// 	return <LessonSection />
			case 'tests':
				return <TestSection />
			default:
				return null
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
					color={`${viewType === 'courses' ? 'secondary' : 'gray'}`}
					className={`btn ${viewType === 'courses' ? 'btn-active' : ''}`}
					onClick={() => setViewType('courses')}
				>
					{t('Courses')}
				</Button>
				<Button
					color={`${viewType === 'tests' ? 'secondary' : 'gray'}`}
					className={`btn ${viewType === 'tests' ? 'btn-active' : ''}`}
					onClick={() => setViewType('tests')}
				>
					{t('Tests')}
				</Button>
				<Button
					isDisabled
					color={`${viewType === 'lessons' ? 'secondary' : 'gray'}`}
					className={`btn ${viewType === 'lessons' ? 'btn-active' : ''}`}
					onClick={() => setViewType('lessons')}
				>
					{t('Lessons')}
				</Button>
			</div>
			<div className='flex flex-wrap gap-5 w-full items-center max-640:p-8'>
				{renderContent()}
			</div>
		</DashboardLayout>
	)
}

export default LibraryPage
