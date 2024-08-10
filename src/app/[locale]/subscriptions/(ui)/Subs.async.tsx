import dynamic from 'next/dynamic'

const SubsPageAsync = dynamic(() => import('./Subs.page'))

export default SubsPageAsync
