'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import Icon from '@/shared/ui/Icon/Icon'
import { Avatar, Card, CardBody, Snippet } from '@nextui-org/react'
import { RiRobot2Fill } from 'react-icons/ri'
import { MessageWithAIFrom } from '../../module/chat.contracts'
import { MessageWithAiType } from '../../module/message.types'
import cls from './MessageWithAI.module.scss'

export default function MessageWithAI({
	file,
	from,
	text,
	type,
}: MessageWithAiType) {
	return (
		<div className={cls.messageBlock}>
			<Avatar
				className={cls.avatar}
				color={`${from === MessageWithAIFrom.AI ? 'secondary' : 'default'}`}
				fallback={
					from === MessageWithAIFrom.AI ? (
						<Icon fontSize={24} SVG={RiRobot2Fill} />
					) : null
				}
			/>
			<div className={cls.messageWithAction}>
				<Card className={classNames(cls.message, {}, [])}>
					<CardBody data-messagefrom={from} className={cls.messageBody}>
						{text}
					</CardBody>
				</Card>
				<Snippet
					codeString={text}
					className={cls.snippet}
					hideSymbol
					variant='bordered'
				/>
			</div>
		</div>
	)
}
