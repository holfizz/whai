import { z } from 'zod'
import { titleDescriptionSchema } from '@/entities/titleDescription/model/titleDescription.contracts'

export interface ITitleDescription {
	title: string
	description: string
}

export type TitleDescriptionData = z.infer<typeof titleDescriptionSchema>
