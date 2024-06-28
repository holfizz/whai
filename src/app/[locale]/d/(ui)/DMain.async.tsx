import dynamic from 'next/dynamic'

const DMainAsync = dynamic(() => import('./DMain.page'))

export default DMainAsync
