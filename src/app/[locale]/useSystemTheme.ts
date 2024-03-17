import { useEffect, useState } from 'react'

const useSystemTheme = () => {
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		const matchDarkMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)',
		)

		const updateTheme = e => {
			setTheme(e.matches ? 'dark' : 'light')
		}

		updateTheme(matchDarkMediaQuery)

		matchDarkMediaQuery.addEventListener('change', updateTheme)

		return () => {
			matchDarkMediaQuery.removeEventListener('change', updateTheme)
		}
	}, [])

	return theme
}

export default useSystemTheme
