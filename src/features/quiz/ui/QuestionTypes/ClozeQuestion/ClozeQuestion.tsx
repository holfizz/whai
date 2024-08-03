import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { useTranslations } from 'next-intl'
import React, {
	Suspense,
	lazy,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import NavigationButtons from '../NavigationButton'
import ClozeLine from './ClozeLine'

const LazyMDX = lazy(() => import('@/shared/ui/MDX/SimpleMDX'))

const MemoizedMDX = React.memo(({ source }) => (
	<Suspense fallback={<DotsLoader />}>
		<LazyMDX source={source} />
	</Suspense>
))

interface ClozeQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

const ClozeQuestion: React.FC<ClozeQuestionProps> = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}) => {
	const t = useTranslations('Quiz')
	const [error, setError] = useState<boolean>(false)
	const { selectedAnswers, setSelectedAnswers } = useQuizStore(state => ({
		selectedAnswers: state.selectedAnswers,
		setSelectedAnswers: state.setSelectedAnswers
	}))

	const [localAnswer, setLocalAnswer] = useState<string>('')
	const [checked, setChecked] = useState<boolean>(false)

	useEffect(() => {
		setLocalAnswer(selectedAnswers[question.id]?.[0] || '')
	}, [selectedAnswers, question.id])

	const handleAnswerChange = useCallback((answer: string) => {
		setLocalAnswer(answer)
	}, [])

	const handleCheck = () => {
		if (!localAnswer) {
			toast.error(t('Please provide an answer before proceeding'))
			return
		}

		setChecked(true)
		setSelectedAnswers(question.id, [localAnswer])
	}

	const handleNext = () => {
		if (!checked) {
			toast.error(t('Please provide an answer before proceeding'))
			return
		}

		onNext()
	}

	const handlePrev = () => {
		onPrev()
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const parsePrompt = (prompt: string) => {
		const parts = prompt.split(/(<ClozeLine\s*\/>)/)

		return parts.map((part, index) => {
			if (part === '<ClozeLine />') {
				return !checked ? (
					<ClozeLine
						key={index}
						value={localAnswer}
						onChange={handleAnswerChange}
					/>
				) : null
			}

			return (
				<React.Fragment key={index}>
					<MemoizedMDX source={part} />
				</React.Fragment>
			)
		})
	}

	const parsedPrompt = useMemo(
		() => parsePrompt(question.prompt),
		[parsePrompt, question.prompt]
	)

	return (
		<>
			<div className='flex flex-col items-center mt-10'>
				{error && (
					<h4 className={'text-red-400 my-5'}>
						{t('Please provide an answer before proceeding')}
					</h4>
				)}
				<div className='flex flex-wrap items-center text-xl'>
					{parsedPrompt}
				</div>

				{checked && (
					<div
						className={`mt-10 text-2xl mx-2 flex items-center justify-center text-center text-accent`}
					>
						<h1>
							<strong>{t('Answer')}:</strong>
							{question.answers.join(' ')}
						</h1>
					</div>
				)}
			</div>
			<Toaster position='top-right' reverseOrder={false} />
			<NavigationButtons
				onPrev={handlePrev}
				onNext={handleNext}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
				isChecked={checked}
				onCheck={handleCheck}
			/>
		</>
	)
}

export default ClozeQuestion
