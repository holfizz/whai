import { create } from 'zustand'
export interface ModalState {
	isOpen: boolean
	topicId?: string
	selectedSubtopicId?: string
	isLessons: boolean
}

export interface ModalActions {
	openModal: (topicId: string) => void
	closeModal: () => void
	setSelectedSubtopicId: (id: string) => void
	setIsLessons: (isLessons: boolean) => void
}

// объедините состояние и действия
export type ModalStore = ModalState & ModalActions
export const useModalStore = create<ModalStore>(set => ({
	isOpen: false,
	topicId: undefined,
	selectedSubtopicId: undefined,
	isLessons: false,

	openModal: (topicId: string) => set({ isOpen: true, topicId }),
	closeModal: () =>
		set({
			isOpen: false,
			topicId: undefined,
			selectedSubtopicId: undefined,
			isLessons: false
		}),
	setSelectedSubtopicId: (id: string) => set({ selectedSubtopicId: id }),
	setIsLessons: (isLessons: boolean) => set({ isLessons })
}))

export default useModalStore
