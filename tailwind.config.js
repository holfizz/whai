/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

const twColors = {
	'background-1': '#f2e4d4',
	'background-2': '#f8f4f0',
	'background-3': '#fdfdfd',
	accent: '#272727',
	secondary: '#bbb9b7',
	'gray-md': '#BDBDBD',
	'gray-3': '#828282',
	'yellow-5': '#97917D',
	'decor-1': '#FFF7DC',
	'decor-2': '#ffb57f',
	'decor-3': '#ffe8a3',
	'decor-4': '#f8f8f8',
	'error-10': '#FF9090',
	'error-4': '#FFC9C9',
	'error-1': '#FFE3E3',
	'error-text': '#B78787',
	'success-10': '#99FF90',
	'success-4': '#C0FFBB',
	'success-1': '#E4FFE2',
	'success-text': '#8EBB8B',
	warning: '#f3e774'
}

module.exports = {
	content: [
		'./src/{shared,widgets,features,app,entities}/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: twColors,
			lineClamp: {
				1: '1',
				2: '2',
				3: '3'
			}
		},
		screens: {
			sm: '393px',
			640: '641px',
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
		}),
		require('@tailwindcss/line-clamp') // Add the line-clamp plugin
	]
}
