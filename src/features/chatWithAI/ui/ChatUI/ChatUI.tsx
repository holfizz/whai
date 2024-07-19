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
	} = useGetAllMessagesInChatWithAI(
		'2be6faca-9d2f-47c6-8218-cc4dfa6c580f',
		skip,
		take
	)

	const handleLoadMore = useCallback(() => {
		if (!isLoadingMore) {
			setIsLoadingMore(true)
			const newSkip = skip + take
			setSkip(newSkip)
			loadMore(newSkip, take)
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
		if (virtuosoRef.current) {
			const virtuoso = virtuosoRef.current
			virtuoso.scrollToIndex(
				messagesAllMessagesInChatWithAI.length - initialTake
			)
		}
	}, [messagesAllMessagesInChatWithAI])

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
			{/*<Loader />*/}
			{showLoader && (
				<div className={'w-full flex  justify-center'}>
					<Loader />
				</div>
			)}
			<Virtuoso
				ref={virtuosoRef}
				style={{ height: '100%' }}
				initialTopMostItemIndex={messagesAllMessagesInChatWithAI.length - 1}
				data={messagesAllMessagesInChatWithAI}
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
