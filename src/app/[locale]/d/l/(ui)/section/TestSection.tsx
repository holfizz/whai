'use client'

import { useGetAllIndependentQuizzes } from '@/entities/quiz'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'

const TestSection = () => {
	const {
		independentQuizzesData,
		loadingIndependentQuizzes,
		errorIndependentQuizzes
	} = useGetAllIndependentQuizzes()

	return (
		<>
			<div>
				{errorIndependentQuizzes && <p>Error loading courses</p>}
				{loadingIndependentQuizzes && <DotsLoader />}
			</div>
			{independentQuizzesData &&
				independentQuizzesData.map((quiz, i) => (
					<div key={i}>
						<h3>{quiz.name}</h3>
						<p>{quiz.description}</p>
						<p>Total Percent: {quiz.totalPercents}%</p>
					</div>
				))}
		</>
	)
}

export default TestSection
