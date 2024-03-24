'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import Icon from '@/shared/ui/Icon/Icon'
import { Avatar, Button, Card, CardBody, Snippet } from '@nextui-org/react'
import { RiDeleteBin7Line, RiRobot2Fill } from 'react-icons/ri'
import { MessageWithAIFrom } from '../model/message.contracts'
import { MessageWithAiType } from '../model/message.types'
import cls from './MessageWithAI.module.scss'

export default function MessageWithAI({ data }: { data: MessageWithAiType }) {
	const { from, file, text } = data

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
				<div className='flex'>
					{' '}
					<Snippet
						codeString={text}
						className={cls.snippet}
						hideSymbol
						variant='bordered'
					/>
					<Button variant='light' isIconOnly>
						<Icon SVG={RiDeleteBin7Line} />
					</Button>
				</div>
			</div>
		</div>
	)
}
