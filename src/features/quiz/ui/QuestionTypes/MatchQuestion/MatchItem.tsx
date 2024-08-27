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
	draggingItem,
	disabled
}) => {
	const updateXarrow = useXarrow()

	return (
		<div className='relative'>
			<Button
				size='lg'
				color={getButtonColor(side, item.content)}
				className={cls.button}
				onClick={() => {
					if (disabled) return // Prevent interaction if disabled
					if (side === 'left') {
						setDraggingItem(item.content)
					} else if (draggingItem) {
						handleMatchChange && handleMatchChange(draggingItem, item.content)
						setDraggingItem(null)
						updateXarrow()
					}
				}}
				disabled={checked || disabled} // Disable the button if needed
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
								: '#ff9090'
							: Object.entries(localMatchingAnswers).some(
									([left, right]) =>
										right === item.content &&
										question.matchingInteraction.answers.some(
											answer => answer[0] === left && answer[1] === right
										)
							  )
							? 'var(--color-success-10)'
							: Object.values(localMatchingAnswers).includes(item.content)
							? '#ff9090'
							: '#BDBDBD'
						: 'var(--color-decor-2)',
					[side === 'left' ? 'right' : 'left']:
						side === 'left' ? '2px' : '-10px'
				}}
				className={cls.Circle}
				onMouseDown={() => {
					if (checked || disabled) return // Prevent interaction if disabled
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
