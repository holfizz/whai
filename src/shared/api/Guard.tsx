import useSignUpMutation from '@/features/auth/model/auth.queries'

interface GuardProps {
	children: JSX.Element
	excludedRoutes?: string[]
}

const Guard = ({ children, excludedRoutes }: GuardProps) => {
	const { data: user } = useSignUpMutation()
	console.log(user)
	return <>{children}</>
}
export default Guard
