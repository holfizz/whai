import Text from '@/shared/ui/Text/Text'
import { Card, Radio, RadioGroup } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import cls from './AppearanceTab.module.scss'

export function AppearanceTab() {
	const t = useTranslations('Appearance')
	const { theme, setTheme } = useTheme()
	return (
		<div className={cls.AppearanceTab}>
			<Text title={t('Theme Mode')} text={t('Enjoy Dark Light mode')} />
			<RadioGroup value={theme} className={cls.radioGroup}>
				<Radio
					classNames={{ base: cls.radioBase }}
					value='system'
					description={t('Recommended')}
					onClick={() => setTheme('system')}
				>
					<Card className={cls.cardSystem}>
						<div className={cls.dividerSystemBig}></div>
						<div className='space-y-3'>
							<div className={`${cls.dividerSystemSmallOne} w-3/5`}></div>
							<div className={`${cls.dividerSystemSmallTwo} w-4/5`}></div>
							<div className={`${cls.dividerLightSmall} w-2/5`}></div>
						</div>
					</Card>
					<Text text={t('System')} />
				</Radio>
				<Radio
					classNames={{ base: cls.radioBase }}
					value='light'
					description={t('For vibrant and active learning')}
					onClick={() => setTheme('light')}
				>
					<Card className={cls.cardLight}>
						<div className={cls.dividerLight}></div>
						<div className='space-y-3'>
							<div className={`${cls.dividerLightSmall} w-3/5`}></div>
							<div className={`${cls.dividerLightSmall} w-4/5`}></div>
							<div className={`${cls.dividerLightSmall} w-2/5`}></div>
						</div>
					</Card>
					<Text text={t('Light')} />
				</Radio>
				<Radio
					classNames={{ base: cls.radioBase }}
					value='dark'
					description={t('For comfortable work at night')}
					onClick={() => setTheme('dark')}
				>
					<Card className={cls.cardDark}>
						<div className={cls.dividerDark}></div>
						<div className='space-y-3'>
							<div className={`${cls.dividerDarkSmall} w-3/5`}></div>
							<div className={`${cls.dividerDarkSmall} w-4/5`}></div>
							<div className={`${cls.dividerDarkSmall} w-2/5`}></div>
						</div>
					</Card>
					<Text text={t('Dark')} />
				</Radio>
			</RadioGroup>
		</div>
	)
}
