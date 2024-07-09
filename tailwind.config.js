/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

const twColors = {
	'background-1': '#f2e4d4',
	'background-2': '#f8f4f0',
	'background-3': '#fdfdfd',
	accent: '#272727',
	secondary: '#bbb9b7',
	'decor-1': '#ffeed7',
	'decor-2': '#e1ece6',
	'decor-3': '#e1e7ec',
	'decor-4': '#f7dedf',
	'decor-5': '#ffbd90',
	'decor-6': '#9ee5b6',
	'decor-7': '#a8cbe9',
	'decor-8': '#f9bcbf',
	danger: '#f37474',
	warning: '#f3e774',
	success: '#87d88f'
}
module.exports = {
	content: [
		'./src/{shared,widgets,features,app,entities}/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: twColors
		},
		screens: {
			sm: '393px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
			'2xl': '1920px',
			// Maximum width breakpoints
			'max-sm': { max: '393px' },
			'max-md': { max: '768px' },
			'max-lg': { max: '1024px' },
			'max-xl': { max: '1440px' },
			'max-2xl': { max: '1920px' }
		}
	},
	darkMode: 'class',
	plugins: [
		nextui({
			extend: {
				colors: twColors
			}
		})
	]
}
