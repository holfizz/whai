import dynamic from 'next/dynamic'

const TopicsPageAsync = dynamic(() => import('./topicsPage'))

export default TopicsPageAsync
