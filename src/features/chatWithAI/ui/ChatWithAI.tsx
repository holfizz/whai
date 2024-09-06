import {
	useCreateChatWithAI,
	useGetAllChatsWithAI
} from '@/entities/chatWithAI/model/chatWithAI.queries'
import { GET_LESSON_NAME, ILesson } from '@/entities/lesson'
import {
	useChatWithAIAnswerSubscription,
	useCreateMessageWithAI,
	useGetAllMessagesInChatWithAI
} from '@/entities/messageWithAI'
import ChatUi from '@/features/chatWithAI/ui/ChatUI/ChatUI'
import logger from '@/shared/lib/utils/logger'
import Button from '@/shared/ui/Button/Button'
import { Modal, ModalContent } from '@/shared/ui/Modal/Modal'
import { useQuery } from '@apollo/client'
import {
	ModalBody,
	ModalFooter,
	ModalProps,
	useDisclosure
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { useChatStore } from '../model/chat-with-ai.store'
import cls from './ChatWithAI.module.scss'
import MessageInput from './MessageInput'
import ModalHeader from './ModalHeader'

const ChatWithAI = ({ lessonId }: { lessonId: string }) => {
	const t = useTranslations('Lesson')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [scrollBehavior, setScrollBehavior] =
		useState<ModalProps['scrollBehavior']>('inside')
	const [isAdditionalParam, setIsAdditionalParam] = useState<boolean>(false)
	const [messageContent, setMessageContent] = useState('')
	const [loading, setLoading] = useState<boolean>(false)
	const [messages, setMessages] = useState<any[]>([])
	const [partialMessage, setPartialMessage] = useState<any>(null)
	const initialTake = 10
	const [skip, setSkip] = useState(0)
	const [take] = useState(initialTake)
	const [isLoadingMore, setIsLoadingMore] = useState(false)

	// Queries
	const { data: LessonData } = useQuery<{ getLesson: Pick<ILesson, 'name'> }>(
		GET_LESSON_NAME,
		{
			variables: { lessonId },
			fetchPolicy: 'cache-and-network'
		}
	)
	const { getAllChatsWithAI, refetch: refetchChats } =
		useGetAllChatsWithAI(lessonId)
	const { createMessageWithAI, createMessageWithAIData } =
		useCreateMessageWithAI()
	const {
		createChatsWithAIData,
		mutationCreateChatWithAI,
		loadingCreateChatsWithAI
	} = useCreateChatWithAI()
	const { selectedChatId, setSelectedChatId } = useChatStore()
	const {
		messagesAllMessagesInChatWithAI,
		loadMore,
		loadingAllMessagesInChatWithAI,
		refetch: refetchMessages
	} = useGetAllMessagesInChatWithAI({
		chatId: selectedChatId,
		initialTake: take,
		initialSkip: skip
	})
	const { subscriptionChatWithAIData } =
		useChatWithAIAnswerSubscription(selectedChatId)

	// Effect for updating messages with new chat data
	useEffect(() => {
		if (messagesAllMessagesInChatWithAI.length > 0) {
			setMessages(messagesAllMessagesInChatWithAI)
		}
	}, [messagesAllMessagesInChatWithAI, selectedChatId])
	useEffect(() => {
		if (selectedChatId) {
			setPartialMessage(null)
			setSkip(0)
			refetchMessages().catch(err =>
				console.error('Error refetching messages:', err)
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedChatId])
	// Effect for handling subscription updates
	useEffect(() => {
		if (subscriptionChatWithAIData && !subscriptionChatWithAIData.is_finish) {
			const { message, is_finish, conversation_id } = subscriptionChatWithAIData

			setPartialMessage(prev => {
				if (prev && prev.id === conversation_id) {
					const newContent = prev.content + message.content
					return { ...prev, content: newContent }
				}
				const updatedMessage = {
					...message,
					content: message.content,
					id: conversation_id
				}

				if (is_finish) {
					setMessages(prevMessages => [
						{ ...updatedMessage, type: 'answer' },
						...prevMessages.filter(msg => msg.id !== updatedMessage.id)
					])
					return null
				}
				return updatedMessage
			})
		}
	}, [subscriptionChatWithAIData])

	const handleLoadMore = useCallback(() => {
		if (!isLoadingMore) {
			setIsLoadingMore(true)
			const newSkip = skip + take
			loadMore({ currentSkip: newSkip, currentTake: take })
				.then(() => {
					setSkip(newSkip)
					setIsLoadingMore(false)
				})
				.catch(() => {
					setIsLoadingMore(false)
				})
		}
	}, [loadMore, skip, take, isLoadingMore])

	const handleStartReached = useCallback(() => {
		if (!isLoadingMore && !loadingAllMessagesInChatWithAI) {
			handleLoadMore()
		}
	}, [handleLoadMore, isLoadingMore, loadingAllMessagesInChatWithAI])

	const handleOpen = () => {
		onOpen()
	}

	const handleSendMessage = async () => {
		if (messageContent.trim().length < 3) {
			alert('Message must be at least 3 characters long')
			return
		}

		const sentMessage = {
			content: messageContent,
			role: 'USER',
			id: crypto.randomUUID()
		}
		setMessages(prevMessages => [sentMessage, ...prevMessages])
		setMessageContent('')

		setLoading(true)

		try {
			await createMessageWithAI({
				variables: {
					chatWithAIRequestDto: {
						chatWithAIId: selectedChatId,
						message: messageContent,
						lessonId: lessonId
					}
				}
			})

			setPartialMessage(null)
			await refetchMessages()
		} catch (error) {
			console.error('Error sending message:', error)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		setMessages(prevMessages => {
			const updatedMessages = prevMessages.filter(
				msg => msg?.role !== 'assistant' || msg?.type !== 'partial'
			)
			return [createMessageWithAIData, ...updatedMessages]
		})
	}, [createMessageWithAIData])
	const isSendButtonDisabled = messageContent.trim().length < 3 || loading

	const handleCreateChat = useCallback(async () => {
		try {
			const createChatInput: {
				lessonId: string
				title?: string
			} = {
				lessonId
			}
			if (LessonData?.getLesson?.name) {
				createChatInput.title = LessonData.getLesson.name
			}
			await mutationCreateChatWithAI({
				variables: {
					createChatInput
				}
			})
		} catch (error) {
			console.error('Error creating chat:', error)
		}
	}, [LessonData, lessonId, mutationCreateChatWithAI])
	useEffect(() => {
		if (createChatsWithAIData) {
			const req = async () => {
				await refetchMessages()
				await refetchChats()
			}
			setSelectedChatId(createChatsWithAIData.id)
			setIsAdditionalParam(false)
			req()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createChatsWithAIData, setSelectedChatId])

	useEffect(() => {
		logger.log(333, selectedChatId)
	}, [selectedChatId])
	return (
		<>
			<Modal
				shouldBlockScroll={false}
				size={'chat'}
				variant={'chat'}
				className={cls.modal}
				onOpenChange={handleOpen}
				isOpen={isOpen}
				onClose={onClose}
				scrollBehavior={scrollBehavior}
				hideCloseButton
			>
				<ModalContent>
					<>
						<ModalHeader
							setMessages={setMessages}
							getAllChatsWithAI={getAllChatsWithAI}
							isAdditionalParam={isAdditionalParam}
							setIsAdditionalParam={setIsAdditionalParam}
							lessonId={lessonId}
							onClose={onClose}
						/>
						<ModalBody className={'h-auto'}>
							{getAllChatsWithAI?.length > 0 ? (
								<ChatUi
									messages={
										partialMessage ? [partialMessage, ...messages] : messages
									}
									loading={loadingAllMessagesInChatWithAI}
									isLoadingMore={isLoadingMore}
									handleStartReached={handleStartReached}
									skip={skip}
								/>
							) : (
								<div className='w-full flex flex-col items-center justify-center'>
									<h1>{t("You don't have chats")}</h1>
									<Button
										color='main'
										onClick={handleCreateChat}
										disabled={loadingCreateChatsWithAI}
									>
										{t('Create a new chat')}
									</Button>
								</div>
							)}
						</ModalBody>
						<ModalFooter>
							<MessageInput
								conversationId={selectedChatId}
								messageContent={messageContent}
								setMessageContent={setMessageContent}
								handleSendMessage={handleSendMessage}
								isSendButtonDisabled={isSendButtonDisabled}
								loading={loading}
							/>
						</ModalFooter>
					</>
				</ModalContent>
			</Modal>
			<Button
				onPress={() => handleOpen()}
				className={cls.askAIBtn}
				color={'accent'}
			>
				{t('Ask AI')}
			</Button>
		</>
	)
}

export default ChatWithAI
