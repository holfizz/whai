import { useCreateChatWithAI } from '@/entities/chatWithAI/'
import { GET_LESSON_NAME, ILesson } from '@/entities/lesson'
import Button from '@/shared/ui/Button/Button'
import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { IoAdd } from 'react-icons/io5'
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
				// Установите созданный чат как выбранный
				setSelectedChatId(data.createChatWithAI.id)
				setIsAdditionalParam(false) // Закрыть меню создания чата
			}
		} catch (error) {
			console.error('Error creating chat:', error)
		}
	}, [
		mutationCreateChatWithAI,
		lessonId,
		LessonData,
		setSelectedChatId,
		setIsAdditionalParam
	])

	return (
		<Button
			onClick={handleCreateChat}
			color={'secondary'}
			variant={'sRound'}
			size={'sRound'}
			startContent={<IoAdd size={24} />}
			disabled={loadingCreateChatsWithAI}
		/>
	)
}

export default CreateChatButton
