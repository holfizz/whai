import LangSwitcher from '@/features/langSwitcher'
import cls from './LanguageTab.module.scss'

export function LanguageTab() {
	return (
		<div className={cls.LanguageTab}>
			<LangSwitcher />
		</div>
	)
}
