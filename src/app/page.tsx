'use client'

import ThemeSwitcher from '@/features/themeSwitcher'

export default function Page() {
	return (
		<div>
			{/*<Button theme={ButtonTheme.OUTLINE}>sdsd</Button>*/}
			{/*<Button theme={ButtonTheme.FILL}>sdsd</Button>*/}
			{/*<Button theme={ButtonTheme.CLEAR}>sdsd</Button>*/}
			{/*<Input theme={InputTheme.OUTLINE} placeholder={'asdsad'}></Input>*/}
			{/*<h1 style={{ color: 'var(--primary-color)' }}>hello!</h1>*/}
			{/*<h6 style={{ color: 'var(--secondary-color)' }}>hello!</h6>*/}
			{/*<h1 style={{ color: 'var(--accent-color)' }}>hello!</h1>*/}
			{/*<h1 style={{ color: 'var(--text-color)' }}>hello!</h1>*/}
			<ThemeSwitcher />
		</div>
	)
}
