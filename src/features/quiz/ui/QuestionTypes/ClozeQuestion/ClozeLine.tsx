import { Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import React from 'react'

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

	const baseClassNames = 'max-w-[300px] min-w-[100px] mx-2 !opacity-100'
	const inputWrapperClassNames = [
		'w-[300px]',
		'py-0',
		'h-auto',
		!isAnswered
			? 'after:bg-decor-2 border-decor-2'
			: isCorrect
			? 'after:bg-success-4 border-success-10'
			: 'after:bg-error-4 border-error-10'
	]
	const inputClassNames = [
		'w-max',
		'text-2xl',
		'text-center',
		!isAnswered
			? 'text-foreground'
			: isCorrect
			? 'text-success-text'
			: 'text-error-text'
	]
	console.log(isCorrect)
	return (
		<Textarea
			isDisabled={isAnswered}
			disableAnimation={isAnswered}
			variant='underlined'
			labelPlacement='outside'
			placeholder={t('Your answer')}
			value={value}
			maxRows={1}
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
