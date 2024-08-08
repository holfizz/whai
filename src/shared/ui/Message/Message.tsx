import { MessageWithAIRole } from '@/entities/messageWithAI'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import SimpleMDX from '../MDX/SimpleMDX'
import cls from './Message.module.scss'

const Message = ({
	children,
	messageFrom = MessageWithAIRole.USER
}: {
	children: string
	messageFrom?: MessageWithAIRole
}) => {
	const mods: Mods = {
		[cls[messageFrom]]: true
	}

	return (
		<div className={classNames(cls.message, mods)}>
			<SimpleMDX>{children}</SimpleMDX>
		</div>
	)
}

export default Message
