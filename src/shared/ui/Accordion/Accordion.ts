'use client'
import {
	Accordion as UIAccordion,
	AccordionItem as UIAccordionItem,
	extendVariants
} from '@nextui-org/react'

export const Accordion = extendVariants(UIAccordion, {
	variants: {
		color: {
			white: {
				base: 'bg-white'
			}
		},
		variant: {},
		isDisabled: {},
		size: {}
	},
	defaultVariants: {}
})

export const AccordionItem = extendVariants(UIAccordionItem, {
	variants: {
		color: {
			white: {
				base: 'bg-white'
			}
		},
		variant: {},
		isDisabled: {},
		size: {}
	},
	defaultVariants: {}
})
