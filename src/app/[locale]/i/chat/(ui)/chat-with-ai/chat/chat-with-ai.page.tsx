'use client'
import { Link } from '@/navigation'
import { getCurrentChatRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { ChatWithAI } from '@/widgets/СhatWithAI'
import { useGetAllChatsWithAI } from '@/widgets/СhatWithAI/module/chat.queries'

const ChatWithAIPage = () => {
	const getAllChatsWithAI = useGetAllChatsWithAI()
	return (
		<DashboardLayout
			className='py-8'
			sidebarChildren={
				<>
					{getAllChatsWithAI.data &&
						getAllChatsWithAI.data.map((item, index) => {
							return (
								<Link key={index} href={getCurrentChatRoute(item.id)}>
									<Button variant='sidebar'>
										<div>
											<p>{item.title}</p>
										</div>
									</Button>
								</Link>
							)
						})}
				</>
			}
		>
			<ChatWithAI />
		</DashboardLayout>
	)
}

export default ChatWithAIPage
