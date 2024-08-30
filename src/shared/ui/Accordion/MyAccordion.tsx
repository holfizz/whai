import ArrowDown from '@/shared/assets/icons/ArrowDown'
import { ReactNode, useState } from 'react'
import './Accordion.scss'

const AccordionItem = ({
	title,
	children,
	endContent,
	startContent,
	addButton,
	isLast,
	className,
	classNameHeaderContent
}: {
	title: ReactNode
	children?: ReactNode
	endContent?: ReactNode
	startContent?: ReactNode
	addButton?: ReactNode
	isLast?: boolean
	className?: string
	classNameHeaderContent?: string
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = () => setIsOpen(!isOpen)

	return (
		<div className={`flex gap-4 w-full ${className}`}>
			<div className='accordion-item'>
				<button
					className='accordion-header'
					onClick={e => {
						e.stopPropagation()
						toggleOpen()
					}}
				>
					{startContent}
					<div className='flex flex-col items-start w-full justify-start gap-4'>
						<div className={`header-content ${classNameHeaderContent}`}>
							<div className='title'>{title}</div>

							<ArrowDown
								className={`${
									isOpen ? 'rotate-180' : ''
								} transition-transform duration-200`}
							/>
						</div>
						{isOpen && (
							<div
								onClick={e => e.stopPropagation}
								className='accordion-content'
							>
								{children}
							</div>
						)}

						{isLast ? <>{addButton}</> : <></>}
					</div>
					{endContent}
				</button>
			</div>
		</div>
	)
}

const Accordion = ({
	children,
	className
}: {
	children: ReactNode
	className?: string
}) => {
	return <div className={`accordion ${className}`}>{children}</div>
}

export { Accordion, AccordionItem }
