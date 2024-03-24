import { z } from 'zod'
import { MessageWithAISchema } from './message.contracts'

export type MessageWithAiType = z.infer<typeof MessageWithAISchema>
