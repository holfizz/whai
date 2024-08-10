import ArrowDown from '@/shared/assets/icons/ArrowDown'
import { ReactNode, useState } from 'react'
import './Accordion.scss'

const AccordionItem = ({
	title,
	children,
	endContent,
	startContent,
	className
}: {
	title: ReactNode
	children?: ReactNode
	endContent?: ReactNode
	startContent?: ReactNode
	className?: string
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = () => setIsOpen(!isOpen)

	return (
		<div className={`flex gap-4 w-full ${className}`}>
			<div className='accordion-item'>
				<button className='accordion-header' onClick={toggleOpen}>
					{startContent}
					<div className='header-content'>
						<div className='title'>{title}</div>

						<ArrowDown
							className={`${
								isOpen ? 'rotate-180' : ''
							} transition-transform duration-200`}
						/>
					</div>
					{endContent}
				</button>
				{isOpen && <div className='accordion-content'>{children}</div>}
			</div>
		</div>
	)
}

const Accordion = ({ children }) => {
	return <div className='accordion'>{children}</div>
}

export { Accordion, AccordionItem }
