import dynamic from 'next/dynamic'

const LibraryPageAsync = dynamic(() => import('./libraryPage'))

export default LibraryPageAsync
