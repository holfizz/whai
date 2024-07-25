'use client'
import { useTranslations } from 'next-intl'
import { Quiz } from '@/features/quiz'
import { DashboardLayout } from '@/widgets/DashboardLayout'

const QuizPage = () => {
	const t = useTranslations('Quiz')
	return (
		<DashboardLayout>
			<div
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
				className='w-full flex items-center flex-col'
			>
				<Quiz />
			</div>
		</DashboardLayout>
	)
}

export default QuizPage
