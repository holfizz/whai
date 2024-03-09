import { classNames } from '@/shared/lib/classNames/classNames'
import Text from '@/shared/ui/Text/Text'
import { Button } from '@nextui-org/react'
import { memo, useState, type FC } from 'react'
import { FiGlobe } from 'react-icons/fi'
import cls from './LangSwitcher.module.scss'

interface LangSwitcherProps {
	className?: string
}

const LangSwitcher: FC<LangSwitcherProps> = memo(({ className }) => {
	const [isActive, setIsActive] = useState(false)

	const handleClick = () => {
		setIsActive(true)

		setTimeout(() => {
			setIsActive(false)
		}, 400)
	}

	return (
		<Button
			className={classNames(cls.LangSwitcher, {}, [className])}
			onClick={handleClick}
		>
			<div
				className={classNames(cls.icon, { [cls.active]: isActive }, [
					className,
				])}
			>
				<FiGlobe />
			</div>
			<Text text={'En'} className={cls.lang}></Text>
		</Button>
	)
})

export default LangSwitcher
