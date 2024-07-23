import create from 'zustand'
import { persist } from 'zustand/middleware'

interface CourseState {
	step: number
	choice: string | null
	courseId: string | null
	promptContent: string
	selectedTitle: string | null
	selectedDescription: string | null
	videosFromYouTube: boolean
	generateImages: boolean
	needHomework: boolean
	setStep: (step: number) => void
	setChoice: (choice: string | null) => void
	setPromptContent: (promptContent: string) => void
	setSelectedTitle: (title: string | null) => void
	setSelectedDescription: (description: string | null) => void
	setVideosFromYouTube: (value: boolean) => void
	setGenerateImages: (value: boolean) => void
	setNeedHomework: (value: boolean) => void
	nextStep: () => void
	prevStep: () => void
	resetState: () => void
}

const useCourseStore = create<CourseState>()(
	persist(
		set => ({
			step: 1,
			choice: null,
			courseId: null,
			promptContent: '',
			selectedTitle: null,
			selectedDescription: null,
			videosFromYouTube: false,
			generateImages: false,
			needHomework: false,
			setStep: step => set({ step }),
			setChoice: choice => set({ choice }),
			setPromptContent: promptContent => set({ promptContent }),
			setSelectedTitle: selectedTitle => set({ selectedTitle }),
			setSelectedDescription: selectedDescription =>
				set({ selectedDescription }),
			setVideosFromYouTube: value => set({ videosFromYouTube: value }),
			setGenerateImages: value => set({ generateImages: value }),
			setNeedHomework: value => set({ needHomework: value }),
			nextStep: () => set(state => ({ step: state.step + 1 })),
			prevStep: () => set(state => ({ step: state.step - 1 })),
			resetState: () =>
				set({
					step: 1,
					choice: null,
					courseId: null,
					promptContent: '',
					selectedTitle: null,
					selectedDescription: null,
					videosFromYouTube: false,
					generateImages: false,
					needHomework: false
				})
		}),
		{
			name: 'course-storage'
		}
	)
)

export default useCourseStore
