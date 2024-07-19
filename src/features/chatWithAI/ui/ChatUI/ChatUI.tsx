import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import Message from '@/shared/ui/Message/Message'
import {
	MessageWithAIRole,
	useGetAllMessagesInChatWithAI
} from '@/entities/messageWithAI'
import Loader from '@/shared/ui/Loader/Loader'

const ChatUi = () => {
	const virtuosoRef = useRef(null)
	const initialTake = 10
	const [skip, setSkip] = useState(0)
	const [take] = useState(initialTake)
	const [isLoadingMore, setIsLoadingMore] = useState(false)

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

	const showLoader =
		(loadingAllMessagesInChatWithAI && skip === 0) || isLoadingMore

	useEffect(() => {
		if (virtuosoRef.current && skip === 0) {
			const virtuoso = virtuosoRef.current
			virtuoso.scrollToIndex(messagesAllMessagesInChatWithAI.length - 1)
		}
	}, [messagesAllMessagesInChatWithAI, skip])

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
			{showLoader && (
				<div className={'w-full flex justify-center'}>
					<Loader />
				</div>
			)}
			<Virtuoso
				ref={virtuosoRef}
				style={{ height: 'calc(100% + 100px)' }}
				data={messagesAllMessagesInChatWithAI?.toReversed()}
				startReached={handleStartReached}
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
