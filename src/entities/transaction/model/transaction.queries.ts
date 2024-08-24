'use client'
import { gql, useMutation } from '@apollo/client'
import { IMakePayment } from './transaction.types'

export const MAKE_PAYMENT = gql`
	mutation MakePayment($dto: MakePaymentDto!) {
		makePayment(dto: $dto) {
			paymentUrl
		}
	}
`
export const useMakePaymentMutation = () => {
	const [mutation, { data, error, loading }] = useMutation<{
		makePayment: IMakePayment
	}>(MAKE_PAYMENT)
	return {
		makePaymentMutation: mutation,
		makePaymentData: data?.makePayment,
		makePaymentError: error,
		makePaymentDataLoading: loading
	}
}
