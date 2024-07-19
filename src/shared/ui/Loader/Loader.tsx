import { FC, memo } from 'react'
import cls from './Loader.module.scss'

const Loader: FC = memo(() => {
	return <span className={cls.loader}></span>
})

export default Loader
