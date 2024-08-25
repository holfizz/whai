import { Input } from '@/shared/ui/Input/InputUI'
import { FC } from 'react'

interface InputFieldProps {
	name: string
	label: string
	type?: string
	color: any
	errorMessage?: string
	onValueChange?: (e: any) => void
	placeholder?: string
	className?: string
}

const InputField: FC<InputFieldProps> = ({
	name,
	label,
	type,
	color,
	errorMessage,
	onValueChange,
	placeholder,
	className
}) => {
	return (
		<label className={className}>
			<Input
				classNames={{
					innerWrapper: 'py-3 px-2 h-[60px]',
					inputWrapper: 'h-auto overflow-hidden',
					input: 'max-md:text-2xl pl-2'
				}}
				name={name}
				isRequired
				radius={'roundedFull'}
				isClearable
				type={type}
				color={color}
				errorMessage={errorMessage}
				onValueChange={onValueChange}
				placeholder={placeholder}
			/>
		</label>
	)
}

export default InputField
