import { Input } from '@/shared/ui/Input/InputUI'
import React, { FC, useState } from 'react'

interface InputPhoneFieldProps {
	name: string
	label: string
	color: any
	errorMessage?: string
	onValueChange?: (value: string) => void
	placeholder?: string
	className?: string
}

const formatPhoneNumber = (value: string): string => {
	// Удаляем все символы, кроме цифр
	const digits = value.replace(/\D/g, '')

	// Ограничиваем количество цифр до 11 (включая начальный +7)
	const maxDigits = digits.slice(0, 11)

	// Форматируем номер телефона в формат +7 (***) *** **-**
	let formattedNumber = '+7'

	if (maxDigits.length > 1) {
		formattedNumber += ` (${maxDigits.slice(1, 4)}`
	}
	if (maxDigits.length >= 5) {
		formattedNumber += `) ${maxDigits.slice(4, 7)}`
	}
	if (maxDigits.length >= 8) {
		formattedNumber += ` ${maxDigits.slice(7, 9)}`
	}
	if (maxDigits.length >= 10) {
		formattedNumber += `-${maxDigits.slice(9, 11)}`
	}

	return formattedNumber.trim()
}

const InputPhoneField: FC<InputPhoneFieldProps> = ({
	name,
	label,
	color,
	errorMessage,
	onValueChange,
	placeholder,
	className
}) => {
	// Изначальное состояние - +7
	const [phoneNumber, setPhoneNumber] = useState('+7')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target) return // Дополнительная проверка на наличие e.target

		let { value } = e.target

		// Проверяем если пользователь начал стирать, предотвращаем необходимость перемещения курсора
		if (value.length < phoneNumber.length) {
			const lastChar = phoneNumber[phoneNumber.length - 1]
			if (['-', ' ', ')', '('].includes(lastChar)) {
				value = value.slice(0, -1)
			}
		}

		// Форматируем вводимый номер телефона
		value = formatPhoneNumber(value)

		// Обновляем состояние компонента и вызываем коллбэк
		setPhoneNumber(value)
		onValueChange?.(value)
	}

	return (
		<label className={className}>
			<Input
				classNames={{
					innerWrapper: 'py-3 px-2 h-[60px]',
					inputWrapper: 'h-auto',
					input: 'max-md:text-2xl'
				}}
				name={name}
				isRequired
				radius={'roundedFull'}
				isClearable
				type='text'
				color={color}
				errorMessage={errorMessage}
				onChange={handleInputChange}
				placeholder={placeholder}
				value={phoneNumber}
			/>
		</label>
	)
}

export default InputPhoneField
