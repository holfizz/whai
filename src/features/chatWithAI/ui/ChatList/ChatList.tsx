import { IChatWithAI } from '@/entities/chatWithAI/model/chatWithAI.types'
import MessageIcon from '@/shared/assets/icons/Lesson/Fill/MessageIcon'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

import CloseIcon from '@/shared/assets/icons/Close'
import { useChatStore } from '../../model/chat-with-ai.store'
import CreateChatButton from './CreateChatButton'

const ChatList = ({
	setIsAdditionalParam,
	lessonId,
	getAllChatsWithAI,
	setMessages
}: {
	setIsAdditionalParam: Dispatch<SetStateAction<boolean>>
	lessonId: string
	getAllChatsWithAI?: IChatWithAI[]
	setMessages: any
}) => {
	const t = useTranslations('Lesson')
	const { setSelectedChatId, selectedChatId } = useChatStore(state => ({
		setSelectedChatId: state.setSelectedChatId,
		selectedChatId: state.selectedChatId
	}))

	const handleChatClick = (chatId: string) => {
		setSelectedChatId(chatId)
		setIsAdditionalParam(false)
		setMessages([]) // Сбросьте старые сообщения
	}

	return (
		<div
			className={
				'w-full max-h-[300px] overflow-y-auto bg-white rounded-3xl p-2 flex flex-col'
			}
		>
			<div className={'flex justify-between w-full'}>
				<div className={'flex h-min max-h-32'}>
					<CreateChatButton setIsAdditionalParam={setIsAdditionalParam} />
					<h3 className={'text-lg font-medium flex items-center ml-2'}>
						{t('Create a new chat')}
					</h3>
				</div>
				<Button
					onClick={() => setIsAdditionalParam(false)}
					color={'white'}
					variant={'sRound'}
					size={'sRound'}
					startContent={
						<CloseIcon fontSize={24} color={'var(--color-secondary)'} />
					}
				/>
			</div>
			{getAllChatsWithAI &&
				getAllChatsWithAI.map((chat, index) => (
					<div
						key={index}
						className={`mt-2 flex items-center cursor-pointer hover:opacity-100 ${
							selectedChatId === chat.id ? 'opacity-100' : 'opacity-50'
						}`}
						onClick={() => {
							if (chat.id !== selectedChatId) {
								handleChatClick(chat.id)
								return
							}
							return
						}}
					>
						<Button
							onClick={() => {
								if (chat.id !== selectedChatId) {
									handleChatClick(chat.id)
									return
								}
								return
							}}
							color={'secondary'}
							variant={'sRound'}
							size={'sRound'}
							startContent={<MessageIcon stroke={'transparent'} />}
						/>
						<h3
							className={
								'text-md font-normal ml-2 whitespace-nowrap overflow-hidden'
							}
						>
							{chat.title}
						</h3>
					</div>
				))}
		</div>
	)
}

export default ChatList
