'use client'
import React from 'react'
import ChoiceStep from './steps/ChoiceStep'
import PromptStep from './steps/PromptStep'
import GenerateTDStep from './steps/GenerateTDStep'
import SettingStep from './steps/SettingStep'
import useCourseStore from '@/app/[locale]/d/c/create/(model)/create-page.store'

const CreateCoursePage = (): React.JSX.Element => {
	const step = useCourseStore(state => state.step)
	const resetState = useCourseStore(state => state.resetState)

	const renderStep = (): React.JSX.Element => {
		switch (step) {
			case 1:
				return <ChoiceStep />
			case 2:
				return <PromptStep />
			case 3:
				return <GenerateTDStep />
			case 4:
				return <SettingStep />
			default:
				resetState()
				return <p>Unknown step</p>
		}
	}

	return <div>{renderStep()}</div>
}

export default CreateCoursePage
