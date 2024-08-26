import dynamic from 'next/dynamic'

const LessonPageAsync = dynamic(() => import('./IndependentLesson.page'))

export default LessonPageAsync
