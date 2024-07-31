import dynamic from 'next/dynamic'

const CreatePageAsync = dynamic(() => import('./Create.page'))

export default CreatePageAsync
