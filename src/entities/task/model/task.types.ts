import { z } from 'zod'
import { SubtopicsData } from './subtopic.contracts'

export interface ISubtopic {
	id: string
	name: string
	description: string
	progressPercents?: number
}

export type ISubtopicData = z.infer<typeof SubtopicsData>
