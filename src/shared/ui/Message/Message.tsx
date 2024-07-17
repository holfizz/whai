import React, { ReactNode } from 'react'
import cls from './Message.module.scss'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'

export enum MessageFrom {
	AI = 'messageAI',
	USER = 'messageUser'
}

const Message = ({
	children,
	messageFrom = MessageFrom.USER
}: {
	children: ReactNode
	messageFrom?: MessageFrom
}) => {
	const mods: Mods = {
		[cls[messageFrom]]: true
	}
	return <div className={classNames(cls.message, mods)}>{children}</div>
}

export default Message
