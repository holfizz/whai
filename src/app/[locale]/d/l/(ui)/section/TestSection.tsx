'use client'

import { useGetAllIndependentQuizzes } from '@/entities/quiz'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import { getQuizIndependentRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { Progress } from '@/shared/ui/Progress/Progress'
import Link from 'next/link'

// Define the quiz summary interface
export interface IQuizSummary {
	id: string
	name: string
	description?: string
	totalPercents?: number
}

const TestSection = () => {
	const {
		independentQuizzesData,
		loadingIndependentQuizzes,
		errorIndependentQuizzes
	} = useGetAllIndependentQuizzes()

	return (
		<>
			{errorIndependentQuizzes && <p>Error loading quizzes</p>}
			{loadingIndependentQuizzes && <DotsLoader />}

			{independentQuizzesData &&
				independentQuizzesData.map((quiz: IQuizSummary, i) => (
					<div
						key={i}
						className='shadow-sm rounded-[25px] py-4 px-5 mb-4 w-[390px] h-min-[330px] h-auto max-md:w-full max-md:h-min-[252px] lg:w-1/2 max-sm:w-full bg-white'
					>
						<div className='w-full flex justify-between items-start'>
							<div className='flex flex-col'>
								<Link
									href={getQuizIndependentRoute(quiz.id)}
									className='text-xl font-medium'
								>
									{quiz.name}
								</Link>
								<p className='text-gray-600 mt-2'>{quiz.description}</p>
							</div>
							<Button
								size='sRound'
								href={getQuizIndependentRoute(quiz.id)}
								isIconOnly
								startContent={<ArrowUpRight fill='var(--color-accents)' />}
								variant='circle'
								as={Link}
								color='main'
							></Button>
						</div>
						<div className='mt-4'>
							<Progress
								className={`w-[390px] h-1 mt-4 rounded-xl max-md:w-full`}
								size={'sm'}
								color='peach'
								value={quiz.totalPercents}
							></Progress>
						</div>
					</div>
				))}
		</>
	)
}

export default TestSection
