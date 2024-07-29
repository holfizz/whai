import { useTranslations } from 'next-intl'
import React from 'react'
import Xarrow, { Xwrapper } from 'react-xarrows'
import NavigationButtons from '../NavigationButton'
import MatchItem from './MatchItem'
import { MatchQuestionProps } from './MatchQuestion.types'
import { useMatchQuestion } from './useMatchQuestion'

const MatchQuestion: React.FC<MatchQuestionProps> = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}) => {
	const t = useTranslations('Quiz')
	const {
		error,
		checked,
		shuffledLeft,
		shuffledRight,
		localMatchingAnswers,
		handleMatchChange,
		handleCheck,
		handleNext,
		handlePrev,
		getButtonColor,
		getArrowColor,
		setDraggingItem,
		draggingItem
	} = useMatchQuestion(question, onNext, onPrev)

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				{question.prompt}
			</h3>
			{error && (
				<h4 className={'text-red-400 mb-5'}>
					{t('Please match all items before proceeding')}
				</h4>
			)}
			<Xwrapper>
				<div className='relative flex justify-between w-full px-10'>
					<div className='flex flex-col gap-2 relative flex-wrap'>
						{shuffledLeft.map((item, index) => (
							<MatchItem
								key={index}
								item={item}
								side='left'
								getButtonColor={getButtonColor}
								setDraggingItem={setDraggingItem}
								checked={checked}
								question={question}
								localMatchingAnswers={localMatchingAnswers}
							/>
						))}
					</div>
					<div className='flex flex-col gap-2'>
						{shuffledRight.map((item, index) => (
							<MatchItem
								key={index}
								item={item}
								side='right'
								getButtonColor={getButtonColor}
								handleMatchChange={handleMatchChange}
								draggingItem={draggingItem}
								setDraggingItem={setDraggingItem}
								checked={checked}
								question={question}
								localMatchingAnswers={localMatchingAnswers}
							/>
						))}
					</div>
				</div>
				{Object.entries(localMatchingAnswers).map(([left, right], index) =>
					right ? (
						<Xarrow
							key={index}
							start={left}
							end={right}
							color={getArrowColor(left, right)}
							strokeWidth={2}
						/>
					) : null
				)}
			</Xwrapper>
			<NavigationButtons
				onPrev={handlePrev}
				onNext={handleNext}
				onCheck={handleCheck}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
				isChecked={checked}
			/>
		</>
	)
}

export default MatchQuestion
