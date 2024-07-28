'use client'
import useCourseStore from '@/app/[locale]/d/c/create/(model)/create-page.store'
import CheckKnowledgeStep from './steps/CheckKnowledgeStep'
import ChoiceStep from './steps/ChoiceStep'
import GenerateTDStep from './steps/GenerateTDStep'
import PromptStep from './steps/PromptStep'
import SettingStep from './steps/SettingStep'

const CreateCoursePage = () => {
	const step = useCourseStore(state => state.step)
	const resetState = useCourseStore(state => state.resetState)

	const renderStep = () => {
		switch (step) {
			case 1:
				return <ChoiceStep />
			case 2:
				return <PromptStep />
			case 3:
				return <GenerateTDStep />
			case 4:
				return <SettingStep />
			case 5:
				return <CheckKnowledgeStep />
			default:
				resetState()
				return <p>Unknown step</p>
		}
	}

	return <div>{renderStep()}</div>
}

export default CreateCoursePage