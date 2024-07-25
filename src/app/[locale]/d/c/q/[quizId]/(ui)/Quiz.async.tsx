import dynamic from 'next/dynamic'

const QuizPageAsync = dynamic(() => import('./Quiz.page'))

export default QuizPageAsync
