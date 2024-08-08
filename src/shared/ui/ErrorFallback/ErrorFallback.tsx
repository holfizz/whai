// components/ErrorFallback.tsx
import { ReactNode, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface ErrorFallbackProps {
	error: Error
	children: ReactNode
}

const ErrorFallback = ({ error, children }: ErrorFallbackProps) => {
	useEffect(() => {
		toast.error(`Something went wrong: ${error.message}`)
	}, [error])

	return (
		<>
			{children}
			<Toaster position='top-right' reverseOrder={false} />
		</>
	)
}

export default ErrorFallback
