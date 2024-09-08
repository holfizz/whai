import { IChatWithAI } from '@/entities/chatWithAI/model/chatWithAI.types'
import ChatList from '@/features/chatWithAI/ui/ChatList/ChatList'
import CloseIcon from '@/shared/assets/icons/Close'
import ChatsMenuIcon from '@/shared/assets/icons/Lesson/Fill/ChatsMenuIcon'
import Button from '@/shared/ui/Button/Button'
import React from 'react'

const ModalHeader = ({
	isAdditionalParam,
	setIsAdditionalParam,
	lessonId,
	onClose,
	getAllChatsWithAI,
	setMessages
}: {
	isAdditionalParam: boolean
	setIsAdditionalParam: React.Dispatch<React.SetStateAction<boolean>>
	lessonId: string
	onClose: () => void
	getAllChatsWithAI?: IChatWithAI[]
	setMessages: any
}) => {
	return (
		<div
			className={'flex items-center justify-between mt-2 py-[5px] px-[12px]'}
		>
			{isAdditionalParam ? (
				<ChatList
					setMessages={setMessages}
					getAllChatsWithAI={getAllChatsWithAI}
					lessonId={lessonId}
					setIsAdditionalParam={setIsAdditionalParam}
				/>
			) : (
				<>
					<Button
						onClick={() => setIsAdditionalParam(true)}
						color={'white'}
						variant={'circle'}
						size={'sRound'}
						startContent={<ChatsMenuIcon />}
					/>
					<Button
						onPress={onClose}
						color={'accent'}
						variant={'circle'}
						size={'sRound'}
						startContent={
							<CloseIcon fontSize={24} color={'var(--color-white)'} />
						}
					/>
				</>
			)}
		</div>
	)
}

export default ModalHeader
