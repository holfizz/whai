'use client'
import useUnifiedStore from '../(model)/unified.state'
import ChoiceStep from './steps/ChoiceStep'
import AIKnowledgeSummary from './steps/course/AIKnowledgeSummary'
import CheckKnowledgeStep from './steps/course/CheckKnowledgeStep'
import CreateCoursePlanPage from './steps/course/CreateCoursePlant/CreateCoursePlanPage'
import GenerateTDStep from './steps/course/GenerateTDStep/GenerateTDStep'
import PromptStep from './steps/course/PromptStep'
import SettingStep from './steps/course/SettingStep'
import GenerateTDLessonStep from './steps/lesson/GenerateTDLessonStep'
import LessonSettings from './steps/lesson/LessonSettings'
import LessonStep from './steps/lesson/LessonStep'
import PromptLessonStep from './steps/lesson/PromptLessonStep'
import GenerateTDTestStep from './steps/test/GenerateTDTestStep'
import PromptTestStep from './steps/test/PromptTestStep'
import QuizStep from './steps/test/QuizStep'

const CreatePage = () => {
	const { choice, resetState, step } = useUnifiedStore()

	const renderCourseStep = () => {
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
			case 6:
				return <AIKnowledgeSummary />
			case 7:
				return <CreateCoursePlanPage />
			default:
				resetState()
				return <p>Unknown step</p>
		}
	}

	const renderTestStep = () => {
		switch (step) {
			case 1:
				return <ChoiceStep />
			case 2:
				return <PromptTestStep />
			case 3:
				return <GenerateTDTestStep />
			case 4:
				return <QuizStep />
			default:
				resetState()
				return <p>Unknown step</p>
		}
	}

	const renderLessonStep = () => {
		switch (step) {
			case 1:
				return <ChoiceStep />
			case 2:
				return <PromptLessonStep />
			case 3:
				return <GenerateTDLessonStep />
			case 4:
				return <LessonSettings />
			case 5:
				return <LessonStep />
			default:
				resetState()
				return <p>Unknown step</p>
		}
	}

	const renderStep = () => {
		switch (choice) {
			case 'Course':
				return renderCourseStep()
			case 'Test':
				return renderTestStep()
			case 'Lesson':
				return renderLessonStep()
			default:
				return <ChoiceStep />
		}
	}

	return <div>{renderStep()}</div>
}

export default CreatePage
