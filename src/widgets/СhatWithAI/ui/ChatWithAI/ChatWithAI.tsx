'use client'
import { MessageWithAI, MessageWithAiType } from '@/entities/MessageWithAI'
import { MessageWithAIFrom } from '@/entities/MessageWithAI/'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import { Skeleton, Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { GoArrowUp } from 'react-icons/go'
import { PiPaperclipBold } from 'react-icons/pi'

import {
	useChatWithAIMutation,
	useChatWithAISubscription,
	useGetAllMessagesInChatWithAIQuery,
} from '../../module/chat.queries'
import cls from './ChatWithAI.module.scss'

const ChatWithAi = () => {
	const [text, setText] = useState('')
	const [messages, setMessages] = useState<MessageWithAiType[]>([])
	const t = useTranslations('ChatWithAI')
	const { chatWithAi, data, loading } = useChatWithAIMutation()
	const { data: getAllMessageData } = useGetAllMessagesInChatWithAIQuery(2)
	const { data: getMessages } = useChatWithAISubscription(2)

	useEffect(() => {
		if (getAllMessageData) {
			setMessages(prevMessages => [...prevMessages, ...getAllMessageData])
		}
	}, [getAllMessageData])
	useEffect(() => {
		if (getMessages) {
			setMessages(prevMessages => [...prevMessages, ...getMessages])
		}
	}, [getMessages])
	const handleSendMessage = () => {
		setText('')
		const newMessage: MessageWithAiType = {
			from: MessageWithAIFrom.USER,
			text,
			id: Date.now(),
		}

		setMessages(prevMessages => [...prevMessages, newMessage])
		chatWithAi({
			variables: {
				input: {
					text,
					chatWithAIId: 2,
				},
			},
		})
	}

	useEffect(() => {
		if (data) {
			setMessages(prevMessages => [...prevMessages, data])
		}
	}, [data])
	return (
		<div className={cls.Chat}>
			<div className={cls.content}>
				<div className={cls.ChatMessagesBlock}>
					{messages.map((message: any, index: number) => (
						<MessageWithAI key={index} data={message} />
					))}
					{loading && (
						<div className='max-w-[300px] w-full flex items-center gap-3'>
							<div>
								<Skeleton className='flex rounded-full w-12 h-12' />
							</div>
							<div className='w-[250px] flex flex-col gap-2'>
								<Skeleton className='h-[50px] w-full rounded-lg' />
							</div>
						</div>
					)}
				</div>
				<div className={cls.fixedInputBlock}>
					<Textarea
						onChange={e => setText(e.target.value)}
						value={text}
						size='lg'
						maxRows={10}
						minRows={0}
						isDisabled={loading}
						maxLength={4096}
						variant='bordered'
						placeholder={t('Enter your request')}
						disableAnimation
						startContent={
							<Button className={'mt-auto mb-1'} isIconOnly variant='light'>
								<Icon SVG={PiPaperclipBold} fontSize={22} />
							</Button>
						}
						endContent={
							<Button
								onClick={handleSendMessage}
								color='mainFill'
								isIconOnly
								className={cls.requestButton}
							>
								<Icon
									color='var(--background-color)'
									SVG={GoArrowUp}
									fontSize={22}
								/>
							</Button>
						}
						className={cls.requestInput}
						classNames={{
							input: 'resize-y min-h-[40px]',
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default ChatWithAi
