import { FC, memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import Button from '@/shared/ui/Button/Button'
import { useTheme } from 'next-themes'
import { LuMoon, LuSun } from 'react-icons/lu'

interface ThemeSwitcherProps {
	className?: string;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
	const {theme, setTheme} = useTheme()


	const onToggleHandler = useCallback(() => {
		setTheme(theme === 'app_dark_theme' ? "app_light_theme" : "app_dark_theme")
	}, [ setTheme,theme])
	return (
		<Button
			onClick={onToggleHandler}
			className={classNames(cls.ThemeSwitcher, {}, [className])}
		>
			{theme === 'app_dark_theme' ? <LuSun /> : <LuMoon />}
		</Button>
	)
})

export default ThemeSwitcher
