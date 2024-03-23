import { z } from 'zod'
import { MessageWithAISchema } from './chat.contracts'

export type MessageWithAiType = z.infer<typeof MessageWithAISchema>
