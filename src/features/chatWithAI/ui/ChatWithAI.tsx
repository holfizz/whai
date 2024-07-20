import React, { useCallback, useEffect, useState } from 'react'
import cls from './ChatWithAI.module.scss'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { Modal, ModalContent } from '@/shared/Modal/Modal'
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
	const [partialMessage, setPartialMessage] = useState(null) // To store the partial message

	const initialTake = 10
	const [skip, setSkip] = useState(0)
	const [take] = useState(initialTake)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const { createMessageWithAI } = useCreateMessageWithAI()
	const {
		messagesAllMessagesInChatWithAI,
		loadMore,
		errorAllMessagesInChatWithAI,
		loadingAllMessagesInChatWithAI
	} = useGetAllMessagesInChatWithAI({
		chatId: '2be6faca-9d2f-47c6-8218-cc4dfa6c580f',
		initialTake: take,
		initialSkip: skip
	})

	// Subscription to listen for new messages
	const {
		subscriptionChatWithAIData,
		subscriptionChatWithAIError,
		subscriptionChatWithAILoading
	} = useChatWithAIAnswerSubscription('2be6faca-9d2f-47c6-8218-cc4dfa6c580f')

	useEffect(() => {
		if (
			subscriptionChatWithAIData &&
			subscriptionChatWithAIData.message.type === 'answer'
		) {
			const { message, is_finish } = subscriptionChatWithAIData
			setPartialMessage(prev => {
				const updatedMessage = (prev?.content || '') + message.content

				if (is_finish) {
					// If message is finished, add it to messages
					setMessages(prevMessages => [
						{
							content: updatedMessage.replace(/\n/g, '<br/>'),
							role: message.role,
							id: crypto.randomUUID()
						},
						...prevMessages // Adding to the start of the array
					])
					return null // Reset partial message
				} else {
					return {
						content: updatedMessage,
						role: message.role,
						id: prev ? prev.id : crypto.randomUUID()
					}
				}
			})
		}
	}, [subscriptionChatWithAIData])

	useEffect(() => {
		if (partialMessage) {
			setMessages(prevMessages => {
				const existingMessageIndex = prevMessages.findIndex(
					msg => msg.id === partialMessage.id
				)
				if (existingMessageIndex > -1) {
					// Update the existing partial message
					const updatedMessages = [...prevMessages]
					updatedMessages[existingMessageIndex] = {
						...partialMessage,
						content: partialMessage.content
					}
					return updatedMessages
				} else {
					// Add the new partial message
					return [
						{
							...partialMessage,
							content: partialMessage.content
						},
						...prevMessages
					]
				}
			})
		}
	}, [partialMessage])

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
			await createMessageWithAI({
				variables: {
					chatWithAIRequestDto: {
						chatWithAIId: '2be6faca-9d2f-47c6-8218-cc4dfa6c580f',
						content: messageContent
					}
				}
			})
		} catch (error) {
			console.error('Error sending message:', error)
		} finally {
			setLoading(false)
		}
	}

	const isSendButtonDisabled = messageContent.trim().length < 3 || loading

	if (errorAllMessagesInChatWithAI) {
		return <div>Error: {errorAllMessagesInChatWithAI.message}</div>
	}

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
								messages={messages} // Use local state messages to avoid duplication
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
