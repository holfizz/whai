import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/{shared,widgets,features,app,entities}/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			// extend: {
			// 	colors: {
			// 		// .. rest of the colors
			// 	},
			// },
			// themes: {
			// 	light: {
			// 		colors: {
			// 			primary: '#2f311d',
			// 		},
			// 	},
			// 	dark: {
			// 		colors: {
			// 			primary: '#e8f99b',
			// 		},
			// 	},
			// },
		}),
	],
}
