import { useCreateChatWithAI } from '@/entities/chatWithAI/'
import { useGetAllChatsWithAI } from '@/entities/chatWithAI/model/chatWithAI.queries'
import { GET_LESSON_NAME, ILesson } from '@/entities/lesson'
import Button from '@/shared/ui/Button/Button'
import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useCallback } from 'react'

import PlusIcon from '@/shared/assets/icons/Plus'
import { useChatStore } from '../../model/chat-with-ai.store'

const CreateChatButton = ({
	setIsAdditionalParam
}: {
	setIsAdditionalParam: Dispatch<SetStateAction<boolean>>
}) => {
	const { lessonId } = useParams<{ lessonId: string }>()
	const { data: LessonData } = useQuery<{
		getLesson: Pick<ILesson, 'name'>
	}>(GET_LESSON_NAME, {
		variables: { lessonId },
		fetchPolicy: 'cache-and-network'
	})
	const { mutationCreateChatWithAI, loadingCreateChatsWithAI } =
		useCreateChatWithAI()
	const { setSelectedChatId } = useChatStore(state => ({
		setSelectedChatId: state.setSelectedChatId
	}))
	const { refetch: refetchChats } = useGetAllChatsWithAI(lessonId)

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

			const { data } = await mutationCreateChatWithAI({
				variables: {
					createChatInput
				}
			})

			if (data?.createChatWithAI) {
				setSelectedChatId(data.createChatWithAI.id)
				setIsAdditionalParam(false)
				await refetchChats() // Refetch the chats after creation
			}
		} catch (error) {
			console.error('Error creating chat:', error)
		}
	}, [
		mutationCreateChatWithAI,
		lessonId,
		LessonData,
		setSelectedChatId,
		setIsAdditionalParam,
		refetchChats
	])

	return (
		<Button
			onClick={handleCreateChat}
			color={'secondary'}
			variant={'sRound'}
			size={'sRound'}
			startContent={<PlusIcon stroke='none' fontSize={24} />}
			disabled={loadingCreateChatsWithAI}
		/>
	)
}

export default CreateChatButton
