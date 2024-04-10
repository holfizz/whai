import dynamic from 'next/dynamic'

const MainPageAsync = dynamic(() => import('./main.page'))
export default MainPageAsync
