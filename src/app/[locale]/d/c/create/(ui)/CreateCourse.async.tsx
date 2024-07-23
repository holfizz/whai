import dynamic from 'next/dynamic'

const CreateCoursePageAsync = dynamic(() => import('./CreateCourse.page'))

export default CreateCoursePageAsync
