import { FC, memo, useCallback, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import Button from '@/shared/ui/Button/Button'
import { Theme } from '@/shared/const/theme'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { LuMoon, LuSun } from 'react-icons/lu'
import { CSSTransition } from 'react-transition-group'

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { theme, toggleTheme } = useTheme()
  const [themeSwitch, setThemeSwitch] = useState<boolean>(false)
  useEffect(() => {
    setThemeSwitch((prevState) => !prevState)
  }, [theme])
  const onToggleHandler = useCallback(() => {
    toggleTheme()
  }, [ toggleTheme])
  return (
    <Button
      onClick={onToggleHandler}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
    >
      <CSSTransition
        in={themeSwitch}
        timeout={400}
        classNames={{
          enter: cls.sunMoonEnter,
          enterActive: cls.sunMoonEnterActive,
          exit: cls.sunMoonExit,
          exitActive: cls.sunMoonExitActive,
        }}
      >
        {theme === Theme.DARK ? <LuSun /> : <LuMoon />}
      </CSSTransition>
    </Button>
  )
})

export default ThemeSwitcher
