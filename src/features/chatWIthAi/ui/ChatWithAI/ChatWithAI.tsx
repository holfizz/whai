'use client'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import { Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { GoArrowUp } from 'react-icons/go'
import { PiPaperclipBold } from 'react-icons/pi'
import { MessageWithAI } from '../..'
import { MessageWithAIFrom } from '../../module/chat.contracts'
import { useChatWithAIMutation } from '../../module/chat.queries'
import { MessageWithAiType } from '../../module/message.types'
import cls from './ChatWithAI.module.scss'

const ChatWithAi = () => {
	const [text, setText] = useState('')
	const [messages, setMessages] = useState<MessageWithAiType[]>([])
	const t = useTranslations('ChatWithAI')
	const { chatWithAi, data } = useChatWithAIMutation()

	const handleSendMessage = () => {
		setText('')
		const newMessage: MessageWithAiType = { from: MessageWithAIFrom.USER, text }
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
			const { from, text } = data
			setMessages(prevMessages => [...prevMessages, { from, text }])
		}
	}, [data])

	return (
		<div className={cls.Chat}>
			<div className={cls.content}>
				<div className={cls.ChatMessagesBlock}>
					{messages.map((message, index) => (
						<MessageWithAI
							key={index}
							text={message.text}
							file={undefined}
							type={''}
							from={message.from}
						/>
					))}
				</div>
				<div className={cls.requestInputBlock}>
					<Textarea
						onChange={e => setText(e.target.value)}
						value={text}
						size='lg'
						maxRows={40}
						minRows={0}
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
