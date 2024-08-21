import { Footer } from './Footer'
import './Layout.scss'
import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
	return (
		<div className='layout-container'>
			<Navbar />
			<main className='content'>{children}</main>
			<Footer />
		</div>
	)
}
