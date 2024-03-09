import { Input } from '@nextui-org/react'
import { FC } from 'react'

interface InputFieldProps {
	name: string
	label: string
	type?: string
	color:
		| 'secondary'
		| 'default'
		| 'primary'
		| 'success'
		| 'warning'
		| 'danger'
		| undefined
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
	className,
}) => {
	return (
		<label className={className}>
			<Input
				name={name}
				isRequired
				isClearable
				type={type}
				label={label}
				variant='bordered'
				color={color}
				errorMessage={errorMessage}
				onValueChange={onValueChange}
				placeholder={placeholder}
			/>
		</label>
	)
}

export default InputField
