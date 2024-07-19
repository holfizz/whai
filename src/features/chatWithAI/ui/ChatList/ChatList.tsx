import { Dispatch, SetStateAction } from 'react'
import Button from '@/shared/ui/Button/Button'
import { IoAdd, IoClose } from 'react-icons/io5'
import { useGetAllChatsWithAI } from '@/entities/chatWithAI/model/chatWithAI.queries'
import { useTranslations } from 'next-intl'
import MessageIcon from '@/shared/assets/icons/Lesson/Fill/MessageIcon'

const ChatList = ({
	setIsAdditionalParam,
	lessonId
}: {
	setIsAdditionalParam: Dispatch<SetStateAction<boolean>>
	lessonId: string
}) => {
	const { getAllChatsWithAI } = useGetAllChatsWithAI(lessonId)
	const t = useTranslations('Lesson')

	return (
		<div
			className={
				'w-full h-auto min-h-20 bg-white rounded-3xl p-2 flex flex-col'
			}
		>
			<div className={'flex justify-between w-full'}>
				<div className={'flex h-min max-h-32 '}>
					<Button
						onClick={() => setIsAdditionalParam(true)}
						color={'secondary'}
						variant={'sRound'}
						size={'sRound'}
						startContent={<IoAdd size={24} />}
					/>
					<h3 className={'text-lg font-medium flex items-center ml-2'}>
						{t('Create a new chat')}
					</h3>
				</div>
				<Button
					onClick={() => setIsAdditionalParam(false)}
					color={'white'}
					variant={'sRound'}
					size={'sRound'}
					startContent={<IoClose size={24} color={'var(--color-secondary)'} />}
				/>
			</div>
			{getAllChatsWithAI &&
				getAllChatsWithAI.map(chat => (
					<div
						className={
							'mt-2 flex items-center opacity-50 hover:opacity-100 cursor-pointer hover:transition-opacity transition-opacity'
						}
					>
						<Button
							onClick={() => setIsAdditionalParam(true)}
							color={'secondary'}
							variant={'sRound'}
							size={'sRound'}
							startContent={<MessageIcon stroke={'transparent'} />}
						/>
						<h3
							className={
								'text-md font-normal ml-2 w-2/3 text-ellipsis whitespace-nowrap overflow-hidden h-min block'
							}
						>
							{chat.title}
						</h3>
					</div>
				))}
		</div>
	)
}

export default ChatList
