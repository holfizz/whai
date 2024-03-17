import { usePathname, useRouter } from '@/navigation'
import { Avatar, Select, SelectItem } from '@nextui-org/react'
import { useLocale } from 'next-intl'
import { memo, type FC } from 'react'
import { languages } from '../module/lang.data'

interface LangSwitcherProps {
	className?: string
}

const LangSwitcher: FC<LangSwitcherProps> = memo(({ className }) => {
	const locale = useLocale()
	const router = useRouter()
	const pathName = usePathname()

	const handleChange = (value: string) => {
		router.push(pathName, { locale: value })
	}

	return (
		<Select
			label='Chose language'
			placeholder='Select an animal'
			className='max-w-xs'
			defaultSelectedKeys={[locale]}
			value={locale}
			onChange={e => handleChange(e.target.value)}
		>
			{languages.map(lang => (
				<SelectItem
					startContent={
						<Avatar
							alt='Mexico'
							className='w-6 h-6'
							src={`https://flagcdn.com/${lang.code}.svg`}
						/>
					}
					key={lang.short}
					value={lang.full}
				>
					{lang.full}
				</SelectItem>
			))}
		</Select>
	)
})

export default LangSwitcher
