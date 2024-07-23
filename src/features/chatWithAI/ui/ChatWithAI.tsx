'use client'
import React, { useCallback, useEffect, useState } from 'react'
import cls from './ChatWithAI.module.scss'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { Modal, ModalContent } from '@/shared/ui/Modal/Modal'
import {
	ModalBody,
	ModalFooter,
	ModalProps,
	useDisclosure
} from '@nextui-org/react'
import {
	useChatWithAIAnswerSubscription,
	useCreateMessageWithAI,
	useGetAllMessagesInChatWithAI
} from '@/entities/messageWithAI'
import ModalHeader from './ModalHeader'
import MessageInput from './MessageInput'
import ChatUi from '@/features/chatWithAI/ui/ChatUI/ChatUI'

const ChatWithAI = ({ lessonId }: { lessonId: string }) => {
	const t = useTranslations('Lesson')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [scrollBehavior, setScrollBehavior] =
		useState<ModalProps['scrollBehavior']>('inside')
	const [isAdditionalParam, setIsAdditionalParam] = useState<boolean>(false)
	const [messageContent, setMessageContent] = useState('')
	const [loading, setLoading] = useState<boolean>(false)
	const [messages, setMessages] = useState([]) // State for messages
	const [partialMessage, setPartialMessage] = useState<any>(null) // Use any or a specific type for partial message

	const initialTake = 10
	const [skip, setSkip] = useState(0)
	const [take] = useState(initialTake)
	const [isLoadingMore, setIsLoadingMore] = useState(false)

	const { createMessageWithAI, mutationCreateMessageWithAIData } =
		useCreateMessageWithAI()
	const {
		messagesAllMessagesInChatWithAI,
		loadMore,
		errorAllMessagesInChatWithAI,
		loadingAllMessagesInChatWithAI
	} = useGetAllMessagesInChatWithAI({
		chatId: '2b7809a3-4c11-4334-8fe8-7089ae4f5ff1',
		initialTake: take,
		initialSkip: skip
	})

	// Subscription to listen for new messages
	const {
		subscriptionChatWithAIData,
		subscriptionChatWithAIError,
		subscriptionChatWithAILoading
	} = useChatWithAIAnswerSubscription('2b7809a3-4c11-4334-8fe8-7089ae4f5ff1')

	useEffect(() => {
		if (messagesAllMessagesInChatWithAI.length > 0) {
			setMessages(
				messagesAllMessagesInChatWithAI.map(msg => ({
					...msg,
					content: msg.content
				}))
			)
		}
	}, [messagesAllMessagesInChatWithAI])

	useEffect(() => {
		if (subscriptionChatWithAIData && !subscriptionChatWithAIData.is_finish) {
			const { message, is_finish, conversation_id } = subscriptionChatWithAIData
			console.log(1, message.content)

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
		setMessages(prevMessages => [sentMessage, ...prevMessages]) // Add new message to state immediately
		setMessageContent('')

		setLoading(true)

		try {
			const response = await createMessageWithAI({
				variables: {
					chatWithAIRequestDto: {
						chatWithAIId: '2b7809a3-4c11-4334-8fe8-7089ae4f5ff1',
						content: messageContent
					}
				}
			})

			const finalMessage = response.data.createMessageWithAI
			setMessages(prevMessages => {
				const updatedMessages = prevMessages.filter(
					msg => msg.role !== 'assistant' || msg.type !== 'partial'
				)
				return [finalMessage, ...updatedMessages]
			})
			setPartialMessage(null)
		} catch (error) {
			console.error('Error sending message:', error)
		} finally {
			setLoading(false)
		}
	}

	const isSendButtonDisabled = messageContent.trim().length < 3 || loading

	return (
		<>
			<Modal
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
							isAdditionalParam={isAdditionalParam}
							setIsAdditionalParam={setIsAdditionalParam}
							lessonId={lessonId}
							onClose={onClose}
						/>
						<ModalBody className={'h-auto'}>
							<ChatUi
								messages={
									partialMessage ? [partialMessage, ...messages] : messages
								} // Use partialMessage if present
								loading={loadingAllMessagesInChatWithAI}
								isLoadingMore={isLoadingMore}
								handleStartReached={handleStartReached}
								skip={skip}
							/>
						</ModalBody>
						<ModalFooter>
							<MessageInput
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
