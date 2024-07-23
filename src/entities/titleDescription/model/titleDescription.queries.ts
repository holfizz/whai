import { gql, useMutation } from '@apollo/client'
import { ITitleDescription } from '@/entities/titleDescription/model/titleDescription.types'

export const GET_ALL_MESSAGES_IN_CHAT_WITH_AI = gql`
	mutation ($dto: GenerateTDInput!) {
		generateTD(dto: $dto) {
			title
			description
		}
	}
`

export const useGenerateTD = () => {
	const [mutation, { data, error, loading }] = useMutation<{
		generateTD: ITitleDescription[]
	}>(GET_ALL_MESSAGES_IN_CHAT_WITH_AI, {})

	return {
		mutationTD: mutation,
		mutationTDData: data?.generateTD || [],
		errorTD: error,
		loadingTD: loading
	}
}
