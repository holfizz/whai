import { ITitleDescription } from '@/entities/titleDescription/model/titleDescription.types'
import { gql, useMutation } from '@apollo/client'

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

export const GENERATE_BLOCKS = gql`
	mutation GenerateBlocks($blockInput: BlockInput!) {
		generateBlocks(blockInput: $blockInput)
	}
`
