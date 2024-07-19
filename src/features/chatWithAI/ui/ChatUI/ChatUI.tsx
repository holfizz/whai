import React, { useCallback, useRef } from 'react'
import { Virtuoso } from 'react-virtuoso'
import Message from '@/shared/ui/Message/Message'
import {
	MessageWithAIRole,
	useGetAllMessagesInChatWithAI
} from '@/entities/messageWithAI'

const ChatUi = () => {
	const virtuosoRef = useRef(null)

	const {
		messagesAllMessagesInChatWithAI,
		loadMore,
		errorAllMessagesInChatWithAI,
		loadingAllMessagesInChatWithAI
	} = useGetAllMessagesInChatWithAI(
		'2be6faca-9d2f-47c6-8218-cc4dfa6c580f',
		0,
		10
	)

	// Function to handle loading more messages
	const handleLoadMore = useCallback(() => {
		loadMore()
	}, [loadMore])

	if (loadingAllMessagesInChatWithAI) {
		return <div>Loading...</div>
	}

	if (errorAllMessagesInChatWithAI) {
		return <div>Error: {errorAllMessagesInChatWithAI.message}</div>
	}

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Virtuoso
				ref={virtuosoRef}
				style={{ height: '100%' }}
				initialTopMostItemIndex={messagesAllMessagesInChatWithAI?.length}
				data={messagesAllMessagesInChatWithAI}
				startReached={handleLoadMore}
				itemContent={(index, message) => (
					<div key={index}>
						<Message
							messageFrom={
								message.role === 'USER'
									? MessageWithAIRole.USER
									: MessageWithAIRole.ASSISTANT
							}
						>
							{message.content}
						</Message>
					</div>
				)}
			/>
		</div>
	)
}

export default ChatUi
