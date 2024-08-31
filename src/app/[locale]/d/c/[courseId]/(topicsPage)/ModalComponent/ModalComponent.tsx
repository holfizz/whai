'use client'

import { Modal, ModalContent } from '@/shared/ui/Modal/Modal'
import { ModalHeader } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ModalLessonsBody from './ModalLessonsBody'
import ModalSubtopicsBody from './ModalSubtopicsBody'

interface ModalComponentProps {
	topicId: string | null
	subtopicId: string | null
	isOpen: boolean
	onClose: () => void
}

const ModalComponent = ({
	topicId,
	subtopicId,
	isOpen: propIsOpen,
	onClose
}: ModalComponentProps) => {
	const t = useTranslations('TopicsPage')
	const router = useRouter()
	const [selectedTopicId, setSelectedTopicId] = useState<string | null>(topicId)
	const [selectedSubtopicId, setSelectedSubtopicId] = useState<string | null>(
		subtopicId
	)
	const [isLessons, setIsLessons] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(propIsOpen)

	useEffect(() => {
		console.log('ModalComponent props:', { topicId, subtopicId, propIsOpen })
		console.log('ModalComponent state before update:', {
			selectedTopicId,
			selectedSubtopicId,
			isLessons,
			isOpen
		})

		if (topicId) {
			setSelectedTopicId(topicId)
		}
		if (
			subtopicId !== null &&
			subtopicId !== 'undefined' &&
			subtopicId !== undefined
		) {
			setSelectedSubtopicId(subtopicId)
			setIsLessons(true)
		} else {
			setIsLessons(false)
		}
		setIsOpen(propIsOpen)

		console.log('ModalComponent state after update:', {
			selectedTopicId,
			selectedSubtopicId,
			isLessons,
			isOpen
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [topicId, subtopicId, propIsOpen])

	const handleClose = () => {
		const courseId = new URLSearchParams(window.location.search).get('courseId')
		updateURL({
			courseId: courseId ? courseId : null,
			topicId: null,
			subtopicId: null
		})
		setIsOpen(false)
		onClose()
	}

	const updateURL = (params: { [key: string]: string | null }) => {
		const url = new URL(window.location.href)
		const searchParams = new URLSearchParams(url.search)

		for (const [key, value] of Object.entries(params)) {
			if (value === null) {
				searchParams.delete(key)
			} else {
				searchParams.set(key, value)
			}
		}

		url.search = searchParams.toString()
		router.push(url.toString())
	}

	return (
		<Modal
			color='white'
			backdrop='opaque'
			isOpen={isOpen}
			classNames={{ base: 'max-md:w-[99vw] max-w-xl' }}
			scrollBehavior='inside'
			onOpenChange={isOpen => {
				if (!isOpen) {
					handleClose()
				}
			}}
		>
			<ModalContent className='w-[50vw] h-[70vh]' color='white'>
				<>
					<ModalHeader className='flex flex-col gap-1 w-full'>
						<div className='flex items-center space-x-1 border-b border-gray-100 gap-4'>
							<div
								onClick={() => {
									updateURL({
										courseId: new URLSearchParams(window.location.search).get(
											'courseId'
										),
										topicId: topicId,
										subtopicId: null
									})
									setIsLessons(false)
									setSelectedSubtopicId(null)
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
							topicId={selectedTopicId}
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
