import { useStopGeneration } from '@/entities/chatWithAI'
import SendIcon from '@/shared/assets/icons/Lesson/Fill/SendIcon'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import React from 'react'

const MessageInput = ({
	messageContent,
	setMessageContent,
	handleSendMessage,
	isSendButtonDisabled,
	conversationId,
	loading
}: {
	messageContent: string
	setMessageContent: React.Dispatch<React.SetStateAction<string>>
	handleSendMessage: () => void
	isSendButtonDisabled: boolean
	conversationId?: string
	loading: boolean
}) => {
	const t = useTranslations('Lesson')
	const { stopGeneration } = useStopGeneration()
	if (loading) {
		return (
			<div
				className={
					'h-[64px] w-full rounded-3xl flex justify-between items-center bg-white px-5'
				}
			>
				<DotsLoader className={'mt-2'} />
				<Button
					className={'cursor-pointer'}
					isIconOnly
					size={'sRound'}
					variant={'circle'}
					color={'accent'}
					onClick={() => {
						stopGeneration({
							variables: {
								conversationId
							}
						})
					}}
					// disabled={isSendButtonDisabled}
					startContent={<div className={'w-[10px] h-[10px] bg-white'} />}
				/>
			</div>
		)
	}
	return (
		<Textarea
			classNames={{
				inputWrapper: [
					'w-full',
					'py-[10px]',
					'px-[20px]',
					'rounded-3xl',
					'h-auto',
					'resize-horizontal',
					'overflow-x-auto',
					'whitespace-nowrap',
					'border-1',
					loading ? 'bg-red-100' : '',
					messageContent.trim().length < 3
						? 'border-1 border-red-100 hover:bg-transparent'
						: ''
				],
				innerWrapper: ['flex justify-between', 'h-auto'],
				input: ['w-max']
			}}
			minRows={1}
			placeholder={t('Your question')}
			value={messageContent}
			onChange={e => setMessageContent(e.target.value)}
			endContent={
				<Button
					isIconOnly
					size={'sRound'}
					variant={'circle'}
					color={'accent'}
					onClick={handleSendMessage}
					disabled={isSendButtonDisabled}
					startContent={
						<SendIcon height={20} width={20} fill={'var(--color-white)'} />
					}
				/>
			}
		/>
	)
}

export default MessageInput
