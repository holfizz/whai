import { MessageWithAIRole } from '@/entities/messageWithAI'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import MessageMDX from '../MDX/MessageMDX'
import cls from './Message.module.scss'

const Message = ({
	children,
	messageFrom = MessageWithAIRole.USER,
	loading
}: {
	children: string
	messageFrom?: MessageWithAIRole
	loading?: boolean
}) => {
	const mods: Mods = {
		[cls[messageFrom]]: true
	}

	return (
		<div className={classNames(cls.message, mods)}>
			<MessageMDX>{children}</MessageMDX>
		</div>
	)
}

export default Message
