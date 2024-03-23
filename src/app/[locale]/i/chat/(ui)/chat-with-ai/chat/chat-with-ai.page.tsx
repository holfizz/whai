import { ChatWithAI } from '@/features/chatWIthAi'
import { DashboardLayout } from '@/widgets/DashboardLayout'

const ChatWithAIPage = () => {
	return (
		<DashboardLayout className='py-8'>
			<ChatWithAI />
		</DashboardLayout>
	)
}

export default ChatWithAIPage
