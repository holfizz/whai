'use client'
import { Accordion } from '@/shared/ui/Accordion/Accordion'
import { Layout } from '@/widgets/Layout'
import { AccordionItem } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

const FAQPage = () => {
	const t = useTranslations('FAQ')

	return (
		<Layout>
			<div className={'w-full h-screen flex justify-center'}>
				<div className='w-[60%] gap-5 flex items-center flex-col justify-center'>
					<h1 className='text-decor-2 text-3xl text-bold'>{t('faqtitle')}</h1>
					<p className='text-center text-lg'>
						{t('faqDescription')} {/* Add a description under the title */}
					</p>
					<Accordion variant='bordered'>
						<AccordionItem
							key='1'
							aria-label='Accordion 1'
							title={t('question1')}
						>
							{t('answer1')}
						</AccordionItem>
						<AccordionItem
							key='2'
							aria-label='Accordion 2'
							title={t('question2')}
						>
							{t('answer2')}
						</AccordionItem>
						<AccordionItem
							key='3'
							aria-label='Accordion 3'
							title={t('question3')}
						>
							{t('answer3')}
						</AccordionItem>
						<AccordionItem
							key='4'
							aria-label='Accordion 4'
							title={t('question4')}
						>
							{t('answer4')}
						</AccordionItem>
						<AccordionItem
							key='5'
							aria-label='Accordion 5'
							title={t('question5')}
						>
							{t('answer5')}
						</AccordionItem>
						<AccordionItem
							key='6'
							aria-label='Accordion 6'
							title={t('question6')}
						>
							{t('answer6')}
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</Layout>
	)
}

export default FAQPage
