import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'
import { IconType } from 'react-icons'


interface IconProps extends Omit<IconType, "ref"> {
  className?: string;
  SVG: IconType ;
}

const Icon: FC<IconProps> = memo(({ className, SVG, ...otherProps }) => {
  return (
    <SVG
      className={classNames(cls.Icon, {}, [className])}
      {...otherProps}
    />
  )
})

export default Icon
