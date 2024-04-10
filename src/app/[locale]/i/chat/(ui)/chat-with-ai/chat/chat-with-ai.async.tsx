import dynamic from 'next/dynamic'

const ChatWithAiAsync = dynamic(() => import('./chat-with-ai.page'))
export default ChatWithAiAsync
