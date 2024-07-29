import Button from '@/shared/ui/Button/Button'
import React from 'react'
import { useXarrow } from 'react-xarrows'
import cls from './MatchQuestion.module.scss'
import { MatchItemProps } from './MatchQuestion.types'

const MatchItem: React.FC<MatchItemProps> = ({
	item,
	side,
	getButtonColor,
	setDraggingItem,
	checked,
	question,
	localMatchingAnswers,
	handleMatchChange,
	draggingItem
}) => {
	const updateXarrow = useXarrow()

	return (
		<div className='relative w-min'>
			<Button
				size='lg'
				color={getButtonColor(side, item.content)}
				className='mb-2'
				onClick={() => {
					if (side === 'left') {
						setDraggingItem(item.content)
					} else if (draggingItem) {
						handleMatchChange && handleMatchChange(draggingItem, item.content)
						setDraggingItem(null)
						updateXarrow()
					}
				}}
			>
				{item.content}
			</Button>
			<div
				id={item.content}
				style={{
					backgroundColor: checked
						? side === 'left'
							? question.matchingInteraction.answers.some(
									answer =>
										answer[0] === item.content &&
										answer[1] === localMatchingAnswers[item.content]
							  )
								? 'var(--color-success-10)'
								: 'var(--color-error-10)'
							: Object.entries(localMatchingAnswers).some(
									([left, right]) =>
										right === item.content &&
										question.matchingInteraction.answers.some(
											answer => answer[0] === left && answer[1] === right
										)
							  )
							? 'var(--color-success-10)'
							: Object.values(localMatchingAnswers).includes(item.content)
							? 'var(--color-error-10)'
							: '#BDBDBD'
						: 'var(--color-decor-2)',
					[side === 'left' ? 'right' : 'left']:
						side === 'left' ? '2px' : '-10px'
				}}
				className={cls.Circle}
				onMouseDown={() => {
					if (side === 'left') {
						setDraggingItem(item.content)
					} else if (draggingItem) {
						handleMatchChange && handleMatchChange(draggingItem, item.content)
						setDraggingItem(null)
						updateXarrow()
					}
				}}
			/>
		</div>
	)
}

export default MatchItem
