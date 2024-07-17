import { CircularProgress } from '@/shared/ui/CircularProgress/CircularProgress'
import React, { FC } from 'react'
import cls from './DropDownTitle.module.scss'
import Text, { TextSize } from '@/shared/ui/Text/Text'

export const DropdownTitle: FC<{ completed: number }> = ({ completed }) => {
	const value: number = (completed / 4) * 100

	return (
		<div className={cls.container}>
			<div>
				<Text
					text='В знании сила'
					size={TextSize.XL}
					className='font-bold text-[22px]'
				/>
				<Text
					text='Получите максимальную отдачу от Whai, выполнив следующие задания.'
					size={TextSize.L}
					className='mt-2'
				/>
			</div>
			<div className={'flex justify-center items-center flex-nowrap'}>
				<CircularProgress
					variant={'big'}
					size='lg'
					value={value}
					strokeWidth={3}
					showValueLabel={true}
					color='main'
				/>
				<h1 className={'absolute'}>{completed}/4</h1>
			</div>
		</div>
	)
}
