import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const shuffleArray = (array: any[]) => {
	const newArray = [...array]
	for (let i = newArray.length - 1, j; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1))
		;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
	}
	return newArray
}

export const useMatchQuestion = (
	question: IQuestion,
	onNext: () => void,
	onPrev: () => void
) => {
	const t = useTranslations('Quiz')
	const {
		matchingAnswers,
		setMatchingAnswers,
		checkedQuestions,
		setCheckedQuestion
	} = useQuizStore(state => ({
		matchingAnswers: state.matchingAnswers,
		setMatchingAnswers: state.setMatchingAnswers,
		checkedQuestions: state.checkedQuestions,
		setCheckedQuestion: state.setCheckedQuestion
	}))

	const [localMatchingAnswers, setLocalMatchingAnswers] = useState<{
		[key: string]: string
	}>({})
	const [draggingItem, setDraggingItem] = useState<string | null>(null)
	const [checked, setChecked] = useState<boolean>(false)

	const shuffledArrays = useMemo(() => {
		return {
			left: shuffleArray([...question.matchingInteraction.left]),
			right: shuffleArray([...question.matchingInteraction.right])
		}
	}, [question])

	const shuffledLeft = shuffledArrays.left
	const shuffledRight = shuffledArrays.right

	useEffect(() => {
		const storedAnswers = matchingAnswers[question.id] || []
		const initialAnswers = shuffledLeft.reduce((acc, leftItem) => {
			const match = storedAnswers.find(
				answer => answer.left === leftItem.content
			)
			acc[leftItem.content] = match ? match.right : ''
			return acc
		}, {} as { [key: string]: string })

		setLocalMatchingAnswers(initialAnswers)
		setChecked(checkedQuestions[question.id] || false)
	}, [shuffledLeft, matchingAnswers, checkedQuestions, question.id])

	const handleMatchChange = (leftItem: string, rightItem: string) => {
		setLocalMatchingAnswers(prev => ({
			...prev,
			[leftItem]: rightItem
		}))
	}

	const handleCheck = () => {
		const allMatched = Object.values(localMatchingAnswers).every(
			value => value !== ''
		)

		if (!allMatched) {
			toast.error(t('Please match all items before proceeding'))
			return // Exit early if not all items are matched
		}

		setChecked(true)
		setCheckedQuestion(question.id, true)
		setMatchingAnswers(
			question.id,
			Object.entries(localMatchingAnswers).map(([left, right]) => ({
				left,
				right
			}))
		)
	}

	const handleNext = () => {
		if (!checked) {
			toast.error(t('Please match all items before proceeding'))

			return
		}

		onNext()
	}

	const handlePrev = () => {
		onPrev()
	}

	const getButtonColor = (column: 'left' | 'right', item: string): string => {
		if (!checked) {
			return column === 'left' ? 'secondary' : 'primary'
		}

		if (column === 'left') {
			return localMatchingAnswers[item]
				? question.matchingInteraction.answers.some(
						answer =>
							answer[0] === item && answer[1] === localMatchingAnswers[item]
				  )
					? 'success'
					: 'error'
				: 'secondary'
		} else {
			const isMatched = Object.entries(localMatchingAnswers).some(
				([left, right]) =>
					right === item &&
					question.matchingInteraction.answers.some(
						answer => answer[0] === left && answer[1] === right
					)
			)

			const hasMatch = Object.values(localMatchingAnswers).includes(item)

			return isMatched ? 'success' : hasMatch ? 'error' : 'gray'
		}
	}

	const getArrowColor = (left: string, right: string) => {
		if (!checked) return 'var(--color-decor-2)'
		const correctMatch = question.matchingInteraction.answers.some(
			answer => answer[0] === left && answer[1] === right
		)
		return correctMatch ? 'var(--color-success-4)' : 'var(--color-error-4)'
	}

	return {
		checked,
		shuffledLeft,
		shuffledRight,
		localMatchingAnswers,
		handleMatchChange,
		handleCheck,
		handleNext,
		handlePrev,
		getButtonColor,
		getArrowColor,
		setDraggingItem,
		draggingItem
	}
}
