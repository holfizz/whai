import { MessageWithAIRole } from '@/entities/messageWithAI'
import Loader from '@/shared/ui/Loader/Loader'
import Message from '@/shared/ui/Message/Message'
import { useEffect, useRef } from 'react'
import { Virtuoso } from 'react-virtuoso'

const ChatUi = ({
	messages,
	loading,
	isLoadingMore,
	handleStartReached,
	skip
}) => {
	const virtuosoRef = useRef(null)

	useEffect(() => {
		if (virtuosoRef.current && skip === 0) {
			const virtuoso = virtuosoRef.current
			virtuoso.scrollToIndex(messages.length - 1)
		}
	}, [messages, skip])

	const showLoader = (loading && skip === 0) || isLoadingMore

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
				data={messages?.toReversed()}
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
