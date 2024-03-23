'use client'
import { Snippet as UiSnippet, extendVariants } from '@nextui-org/react'

const Snippet = extendVariants(UiSnippet, {
	variants: {
		color: {
			content: {
				clear: 'text-[var(--primary-color)]',
			},
		},
	},
	defaultVariants: {
		size: 'md',
	},
})
export default Snippet
