import { classNames } from '@/shared/lib/classNames/classNames'
import Button from '@/shared/ui/Button/Button'
import { useTheme } from 'next-themes'
import { FC, memo, useCallback } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import cls from './ThemeSwitcher.module.scss'

interface ThemeSwitcherProps {
	className?: string
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
	const { theme, setTheme } = useTheme()

	const onToggleHandler = useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}, [setTheme, theme])
	return (
		<Button
			onClick={onToggleHandler}
			className={classNames(cls.ThemeSwitcher, {}, [className])}
		>
			{theme === 'dark' ? <LuSun /> : <LuMoon />}
		</Button>
	)
})

export default ThemeSwitcher
