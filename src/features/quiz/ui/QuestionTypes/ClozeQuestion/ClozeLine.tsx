import { Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import React from 'react'
interface ClozeLineProps {
	value: string
	onChange: (value: string) => void
}

const ClozeLine: React.FC<ClozeLineProps> = ({ value, onChange }) => {
	const t = useTranslations('Quiz')
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value)
	}

	return (
		<Textarea
			variant='underlined'
			labelPlacement='outside'
			placeholder={t('Your answer')}
			value={value}
			maxRows={1}
			classNames={{
				base: 'max-w-[300px] min-w-[100px mx-2',
				inputWrapper: ['w-[300px]', 'py-0', 'h-auto', 'after:bg-decor-2'],
				innerWrapper: ['flex justify-between', 'h-auto', 'p-0'],
				input: ['w-max', 'text-2xl', 'text-center']
			}}
			onChange={handleChange}
		/>
	)
}

export default ClozeLine
