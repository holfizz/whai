import { Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

interface ClozeLineProps {
	value: string
	onChange: (value: string) => void
	isCorrect: boolean | null
	isAnswered: boolean
}

const ClozeLine: React.FC<ClozeLineProps> = ({
	value,
	onChange,
	isCorrect,
	isAnswered
}) => {
	const t = useTranslations('Quiz')
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value)
	}

	useEffect(() => {
		console.log(22, isCorrect)
	}, [isCorrect])
	const baseClassNames = 'max-w-[300px] min-w-[100px] mx-2 !opacity-100'
	const inputWrapperClassNames = [
		'w-[300px]',
		'py-0',
		'h-auto',
		!isAnswered
			? 'after:bg-decor-2 border-decor-2'
			: isCorrect === true
			? 'after:bg-success-1 border-success-1'
			: isCorrect === false
			? 'after:bg-error-1 border-error-1'
			: ''
	]
	const inputClassNames = ['w-max', 'text-2xl', 'text-center']

	return (
		<Textarea
			isDisabled={isAnswered}
			disableAnimation={isAnswered}
			variant='underlined'
			labelPlacement='outside'
			placeholder={t('Your answer')}
			value={value}
			maxRows={1}
			className={
				!isAnswered
					? 'text-foreground'
					: isCorrect === true
					? 'text-success-text group-data-[has-value=true]:text-success-text'
					: isCorrect === false
					? 'text-error-text group-data-[has-value=true]:text-error-text'
					: ''
			}
			classNames={{
				base: baseClassNames,
				inputWrapper: inputWrapperClassNames,
				innerWrapper: ['flex justify-between', 'h-auto', 'p-0'],
				input: inputClassNames
			}}
			onChange={handleChange}
		/>
	)
}

export default ClozeLine
