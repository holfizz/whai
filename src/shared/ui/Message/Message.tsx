import React, { ReactNode } from 'react'
import cls from './Message.module.scss'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { MessageWithAIRole } from '@/entities/messageWithAI'

const Message = ({
	                 children,
	                 messageFrom = MessageWithAIRole.USER
                 }: {
	children: ReactNode
	messageFrom?: MessageWithAIRole
}) => {
	const mods: Mods = {
		[cls[messageFrom]]: true
	}
	return <div className={classNames(cls.message, mods)}>{children}</div>
}

export default Message
