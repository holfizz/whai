import { FC, memo } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Logo.module.scss'
import { Poppins } from 'next/font/google'
import LogoIcon from '../../assets/Whai.svg'

export enum LogoSize{
	S='small',
	M='medium',
	L='large'
}
interface LogoProps {
  className?: string;
	logoSize?: LogoSize;
}
const poppins = Poppins({ subsets: ["latin"], weight:['400','700','800'] })

const Logo: FC<LogoProps> = memo(({className, logoSize = LogoSize.S}) => {
  const mods:Mods= {
    [cls[logoSize]]:true
  }
  return (
    <LogoIcon className={classNames(cls.Logo, mods, [className , poppins.className])}/>
  )
})

export default Logo
