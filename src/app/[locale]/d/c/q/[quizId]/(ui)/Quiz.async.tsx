import dynamic from 'next/dynamic'

const LessonPageAsync = dynamic(() => import('./Lesson.page'))

export default LessonPageAsync
