import { z } from 'zod'
import { ProfileData, ProfileState } from './auth.contracts'
export interface ActiveSubscription {
	type: 'BASIC' | 'STANDARD' | 'PREMIUM'
	endedAt?: string
	isActive: boolean
	// courseLimitPerMonth?: number
	// lessonLimitPerCourse?: number
	// additionalTitlesLimit?: number
	// hasBasicAnalytics?: boolean
	// hasAIAssistedHomework?: boolean
	// hasFileUploadInChat?: boolean
	// hasImageGeneration?: boolean
}
export interface IUser {
	id: string
	email: string
	firstName: string
	lastName: string
	phoneNumber: string
	avatarPath: string
	isAutoRenewal: boolean
	currentCourseCount: number
	roles: string[]
	currentLessonCount: number
	additionalTitlesCount: number
	activeSubscription?: ActiveSubscription
	isFirstCourseCompleted: boolean
	isHomeworkCompleted: boolean
	isQuizCompleted: boolean
	isFirstLessonCompleted: boolean
	isTrial: boolean
	isTrialUsed: boolean
	trialEndsAt: string
}
export type IUserData = z.infer<typeof ProfileData>

export type IUserState = z.infer<typeof ProfileState>

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
