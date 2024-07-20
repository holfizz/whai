import React from 'react'
import Button from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/InputUI'
import SendIcon from '@/shared/assets/icons/Lesson/Fill/SendIcon'
import { useTranslations } from 'next-intl'

const MessageInput = ({
	messageContent,
	setMessageContent,
	handleSendMessage,
	isSendButtonDisabled,
	loading
}: {
	messageContent: string
	setMessageContent: React.Dispatch<React.SetStateAction<string>>
	handleSendMessage: () => void
	isSendButtonDisabled: boolean
	loading: boolean
}) => {
	const t = useTranslations('Lesson')
	return (
		<Input
			classNames={{
				inputWrapper: [
					'w-full',
					'py-[10px]',
					'px-[20px]',
					'rounded-3xl',
					'h-auto',
					loading ? 'bg-red-100' : '',
					messageContent.trim().length < 3
						? 'border-1 border-red-100 hover:bg-transparent'
						: ''
				],
				innerWrapper: ['flex justify-between'],
				input: ['w-max']
			}}
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
