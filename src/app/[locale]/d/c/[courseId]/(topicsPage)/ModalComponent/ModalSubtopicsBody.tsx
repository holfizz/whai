import { useGetAllSubtopics } from '@/entities/subtopic'
import { useGetTopic } from '@/entities/topic'
import ArrowUpRight from '@/shared/assets/icons/Arrows/Outline/ArrowUpRight'
import { ModalBody } from '@nextui-org/react'
import { FiCheck } from 'react-icons/fi'
import cls from './ModalComponent.module.scss'

const ModalSubtopicsBody = ({
	topicId,
	setIsLessons,
	setSelectedSubtopicId
}) => {
	const { subtopicsAllData } = useGetAllSubtopics(topicId)
	const { topicData } = useGetTopic(topicId)

	const handleSubtopicClick = (subtopicId: string) => {
		setSelectedSubtopicId(subtopicId)
		setIsLessons(true)
	}

	return (
		<ModalBody>
			<div>
				<h1 className={'text-3xl font-semibold text-accent'}>
					{topicData?.name}
				</h1>
				<p>{topicData?.description}</p>
			</div>
			<div>
				<div>
					{subtopicsAllData &&
						subtopicsAllData.map((subtopic, index) => (
							<div className={`${cls.group} mt-3`} key={subtopic.id}>
								<div
									style={{ width: `${subtopic.progressPercents}%` }}
									className={`absolute b-0 bg-decor-3 h-[44px] rounded-xl `}
								></div>
								<div
									onClick={() => handleSubtopicClick(subtopic.id)}
									className={
										'absolute b-0 border-1 border-decor-3 h-[44px] w-full rounded-xl flex items-center px-6 z-20 justify-between'
									}
								>
									<h1
										className={
											'w-[40%] text-nowrap text-ellipsis overflow-hidden'
										}
									>
										{subtopic.name}
									</h1>
									<ArrowUpRight
										className={cls.icon}
										color={'var(--color-accent)'}
									/>
									{subtopic.progressPercents === 100 && (
										<FiCheck className={cls.checkIcon} />
									)}
								</div>
							</div>
						))}
				</div>
			</div>
		</ModalBody>
	)
}

export default ModalSubtopicsBody
