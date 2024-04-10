import dynamic from 'next/dynamic'

const AuthFormAsync = dynamic(() => import('./AuthForm'))

export default AuthFormAsync
