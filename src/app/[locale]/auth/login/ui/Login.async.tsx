import dynamic from 'next/dynamic'

const LoginPageAsync = dynamic(() => import('./Login.page'))

export default LoginPageAsync
