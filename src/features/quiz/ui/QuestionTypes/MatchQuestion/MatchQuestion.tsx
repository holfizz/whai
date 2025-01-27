import { useTranslations } from 'next-intl'
import React from 'react'
import { Toaster } from 'react-hot-toast'
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
	const isSmallScreen =
		typeof window !== 'undefined' && window.innerWidth <= 640
	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				{question.prompt}
			</h3>
			<p className='text-sm text-secondary w-[60%] max-md:w-[80%] text-center mb-8'>
				{t(
					'In order to compare answer options, click on the button from the left column to the button from the right column'
				)}
			</p>

			<Xwrapper>
				<div className='relative flex justify-between w-full px-2'>
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
								handleMatchChange={handleMatchChange}
								draggingItem={draggingItem}
								disabled={checked} // Disable if checked
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
								disabled={checked} // Disable if checked
							/>
						))}
					</div>
				</div>
				{Object.entries(localMatchingAnswers).map(([left, right], index) =>
					right ? (
						<Xarrow
							curveness={isSmallScreen ? 0 : 0.5}
							key={index}
							start={left}
							end={right}
							// headShape={{
							// 	svgElem: <div className='w-4 h-4 bg-red-200' />
							// }}
							color={getArrowColor(left, right)}
							strokeWidth={2}
							_extendSVGcanvas={500}
						/>
					) : null
				)}
			</Xwrapper>
			<Toaster position='top-right' reverseOrder={false} />

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
