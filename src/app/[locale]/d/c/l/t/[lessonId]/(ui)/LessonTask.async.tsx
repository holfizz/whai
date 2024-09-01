import dynamic from 'next/dynamic'

const LessonTaskPageAsync = dynamic(() => import('./LessonTask.page'))

export default LessonTaskPageAsync
