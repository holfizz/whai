'use client'
import { gql, useMutation, useQuery } from '@apollo/client'
import { IUser } from './auth.types'

export const GET_PROFILE = gql`
	query {
		getProfile {
			id
			email
			firstName
			lastName
			isAutoRenewal
			phoneNumber
			currentCourseCount
			currentLessonCount
			additionalTitlesCount
			activeSubscription {
				type
				endedAt
				isActive
				# courseLimitPerMonth
				# lessonLimitPerCourse
				# additionalTitlesLimit
				# hasBasicAnalytics
				# hasAIAssistedHomework
				# hasFileUploadInChat
				# hasImageGeneration
			}
		}
	}
`
export const useGetProfile = () => {
	const { data, error, loading } = useQuery<{ getProfile: IUser }>(
		GET_PROFILE,
		{
			fetchPolicy: 'cache-and-network'
		}
	)
	return { userData: data?.getProfile, errorProfile: error, loading }
}

export const UPDATE_PROFILE = gql`
	mutation ($dto: UpdateUserInput!, $picture: Upload) {
		updateProfile(dto: $dto, picture: $picture) {
			email
			firstName
			lastName
			avatarPath
			phoneNumber
			isAutoRenewal
		}
	}
`
export const useUpdateProfile = () => {
	const [updateProfile, { data, error }] = useMutation<{
		updateProfile: IUser
	}>(UPDATE_PROFILE)
	return { updateProfile, updateData: data?.updateProfile, errorUpdate: error }
}
