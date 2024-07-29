import { IQuestion } from '@/entities/quiz'

export interface MatchQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

export interface MatchItemProps {
	item: { content: string }
	side: 'left' | 'right'
	getButtonColor: (column: 'left' | 'right', item: string) => any // Изменено с void на string
	setDraggingItem: (item: string | null) => any
	checked: boolean
	question: IQuestion
	localMatchingAnswers: { [key: string]: string }
	handleMatchChange?: (leftItem: string, rightItem: string) => void
	draggingItem?: string | null
	disabled: boolean
}
