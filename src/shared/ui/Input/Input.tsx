import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Input.module.scss'

interface InputProps {
	className?: string;
}

const Input: FC<InputProps> = memo(({ className }) => {
  return (
    <div className={classNames(cls.Input, {}, [className])}>

    </div>
  )
})

export default Input
