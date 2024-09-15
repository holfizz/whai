import { MessageWithAIRole } from '@/entities/messageWithAI'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import Message from '@/shared/ui/Message/Message'
import { Skeleton } from '@nextui-org/react'
import { useEffect, useRef } from 'react'
import { Virtuoso } from 'react-virtuoso'

const ChatUi = ({
	messages,
	loading,
	isLoadingMore,
	handleStartReached,
	skip,
	isSending
}) => {
	const virtuosoRef = useRef(null)

	useEffect(() => {
		if (virtuosoRef.current && skip === 0) {
			const virtuoso = virtuosoRef.current
			virtuoso.scrollToIndex(messages.length - 1)
		}
	}, [messages, skip])

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			{isLoadingMore && (
				<div className={'w-full flex justify-center'}>
					<BigDotsLoader />
				</div>
			)}
			<Virtuoso
				ref={virtuosoRef}
				style={{ height: 'calc(100% + 100px)' }}
				data={messages?.toReversed()}
				startReached={handleStartReached}
				itemContent={(index, message) => (
					<div key={index}>
						{message && (
							<Message
								messageFrom={
									message.role === 'USER'
										? MessageWithAIRole.USER
										: MessageWithAIRole.ASSISTANT
								}
							>
								{message.content}
							</Message>
						)}
						{index === messages.length - 1 && isSending && (
							<Skeleton className={'w-[220px] h-[70px] rounded-3xl mt-2'} />
						)}
					</div>
				)}
			/>
		</div>
	)
}

export default ChatUi
