import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { useTranslations } from 'next-intl'
import React from 'react'

const Loader = () => {
	const t = useTranslations('CreateCourse')
	return (
		<>
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					className={`w-full h-auto min-h-30 py-2 px-7 rounded-2xl bg-decor-3 flex flex-col justify-center items-center p-4`}
				>
					<h1 className={'text-sm text-[#97917D] text-center'}>
						{t('Generating, wait a couple of seconds')}
					</h1>
					<DotsLoader className={'mt-4'} />
				</div>
			))}
		</>
	)
}

export default Loader
