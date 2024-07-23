import React from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

const ErrorBoundary = ({ children, fallback }) => {
	return (
		<ReactErrorBoundary FallbackComponent={fallback || ErrorFallback}>
			{children}
		</ReactErrorBoundary>
	)
}

export default ErrorBoundary
