import { Modal, ModalContent } from '@/shared/ui/Modal/Modal'
import { ModalHeader } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import ModalLessonsBody from './ModalLessonsBody'
import ModalSubtopicsBody from './ModalSubtopicsBody'

const ModalComponent = ({ topicId, onClose }) => {
	const t = useTranslations('TopicsPage')
	const [selectedSubtopicId, setSelectedSubtopicId] = useState('')
	const [isLessons, setIsLessons] = useState<boolean>(false)

	return (
		<Modal
			color={'white'}
			backdrop='opaque'
			isOpen={!!topicId}
			classNames={{
				base: 'max-md:w-[99vw] max-w-xl'
			}}
			scrollBehavior='inside'
			onOpenChange={isOpen => !isOpen && onClose()}
		>
			<ModalContent className={'w-[50vw] h-[70vh]'} color={'white'}>
				<>
					<ModalHeader className='flex flex-col gap-1 w-full '>
						<div className='flex items-center space-x-1 border-b border-gray-100 gap-4'>
							<div
								onClick={() => {
									setIsLessons(false)
									setSelectedSubtopicId('')
								}}
								className={`cursor-pointer text-md font-medium tracking-wide text-accent pb-2 ${
									!isLessons && 'border-b border-accent mb-[-1px]'
								}`}
							>
								{t('Topics')}
							</div>
							{isLessons && (
								<div
									className={`cursor-pointer text-md font-medium tracking-wide text-accent pb-2 border-b border-accent mb-[-1px]`}
								>
									{t('Lessons')}
								</div>
							)}
						</div>
					</ModalHeader>
					{isLessons ? (
						<ModalLessonsBody selectedSubtopicId={selectedSubtopicId} />
					) : (
						<ModalSubtopicsBody
							topicId={topicId}
							setIsLessons={setIsLessons}
							setSelectedSubtopicId={setSelectedSubtopicId}
						/>
					)}
				</>
			</ModalContent>
		</Modal>
	)
}

export default ModalComponent
