'use client'
import { MessageWithAI, MessageWithAiType } from '@/entities/MessageWithAI/'
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
	const { data: getMessages, error } = useChatWithAISubscription(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [fetching, setFetching] = useState(true)
	const { data: getAllMessageData } = useGetAllMessagesInChatWithAIQuery(
		5,
		String(currentPage),
		'300',
	)

	useEffect(() => {
		if (getAllMessageData) {
			setMessages(prevMessages => [...prevMessages, ...getAllMessageData])
		}
	}, [getAllMessageData])

	useEffect(() => {
		const scrollHandler = (e: any) => {
			if (e.target.documentElement.scrollTop === 0) {
				setCurrentPage(prevPage => prevPage + 1)
				setFetching(true)
			}
		}
		document.addEventListener('scroll', scrollHandler)
		return () => document.removeEventListener('scroll', scrollHandler)
	}, [])

	useEffect(() => {
		if (getMessages && !error) {
			setMessages(prevMessages => [...prevMessages, getMessages])
		}
	}, [error, getMessages])

	const handleSendMessage = () => {
		setText('')

		chatWithAi({
			variables: {
				input: {
					text,
					chatWithAIId: 5,
				},
			},
		})
	}

	return (
		<div className={cls.Chat}>
			<div className={cls.content}>
				<div className={cls.ChatMessagesBlock}>
					{messages.map((message, index) => {
						return <MessageWithAI key={index} data={message} />
					})}
					{loading && (
						<div className='max-w-[300px] w-full flex items-center gap-3'>
							<Skeleton className='flex rounded-full w-12 h-12' />
							<Skeleton className='h-[50px] w-full rounded-lg' />
						</div>
					)}
				</div>
				<div className={cls.fixedInputBlock}>
					<Textarea
						onChange={e => setText(e.target.value)}
						value={text}
						size='lg'
						isDisabled={loading}
						maxRows={10}
						minRows={0}
						maxLength={4096}
						variant='bordered'
						placeholder={t('Enter your request')}
						disableAnimation
						startContent={
							<Button isIconOnly variant='light'>
								<Icon SVG={PiPaperclipBold} fontSize={22} />
							</Button>
						}
						endContent={
							<Button onClick={handleSendMessage} color='mainFill' isIconOnly>
								<Icon
									color='var(--background-color)'
									SVG={GoArrowUp}
									fontSize={22}
								/>
							</Button>
						}
						className={cls.requestInput}
					/>
				</div>
			</div>
		</div>
	)
}

export default ChatWithAi
