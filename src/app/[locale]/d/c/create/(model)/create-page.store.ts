import { create } from 'zustand'
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
	quizId: string | null
	summaryData: any | null // Add summaryData to the store
	setStep: (step: number) => void
	setChoice: (choice: string | null) => void
	setCourseId: (courseId: string | null) => void
	setPromptContent: (promptContent: string) => void
	setSelectedTitle: (title: string | null) => void
	setSelectedDescription: (description: string | null) => void
	setVideosFromYouTube: (value: boolean) => void
	setGenerateImages: (value: boolean) => void
	setNeedHomework: (value: boolean) => void
	setQuizId: (quizId: string | null) => void
	setSummaryData: (summaryData: any) => void // Add a method to set summaryData
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
			quizId: null,
			summaryData: null, // Initialize summaryData
			setStep: step => set({ step }),
			setChoice: choice => set({ choice }),
			setCourseId: courseId => set({ courseId }),
			setPromptContent: promptContent => set({ promptContent }),
			setSelectedTitle: selectedTitle => set({ selectedTitle }),
			setSelectedDescription: selectedDescription =>
				set({ selectedDescription }),
			setVideosFromYouTube: value => set({ videosFromYouTube: value }),
			setGenerateImages: value => set({ generateImages: value }),
			setNeedHomework: value => set({ needHomework: value }),
			setQuizId: quizId => set({ quizId }),
			setSummaryData: summaryData => set({ summaryData }), // Add method to set summaryData
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
					needHomework: false,
					quizId: null,
					summaryData: null // Reset summaryData
				})
		}),
		{
			name: 'course-storage',
			getStorage: () => localStorage
		}
	)
)

export default useCourseStore
