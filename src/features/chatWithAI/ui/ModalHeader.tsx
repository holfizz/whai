import React from 'react'
import Button from '@/shared/ui/Button/Button'
import { IoClose } from 'react-icons/io5'
import ChatsMenuIcon from '@/shared/assets/icons/Lesson/Fill/ChatsMenuIcon'
import ChatList from '@/features/chatWithAI/ui/ChatList/ChatList'

const ModalHeader = ({
	isAdditionalParam,
	setIsAdditionalParam,
	lessonId,
	onClose
}: {
	isAdditionalParam: boolean
	setIsAdditionalParam: React.Dispatch<React.SetStateAction<boolean>>
	lessonId: string
	onClose: () => void
}) => {
	return (
		<div
			className={'flex items-center justify-between mt-2 py-[5px] px-[12px]'}
		>
			{isAdditionalParam ? (
				<ChatList
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
						startContent={<IoClose size={24} color={'var(--color-white)'} />}
					/>
				</>
			)}
		</div>
	)
}

export default ModalHeader
