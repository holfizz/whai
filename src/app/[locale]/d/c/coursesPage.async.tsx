import dynamic from 'next/dynamic'

const CoursesPageAsync = dynamic(() => import('./coursesPage'))

export default CoursesPageAsync
