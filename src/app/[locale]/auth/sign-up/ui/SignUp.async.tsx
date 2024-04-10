import dynamic from 'next/dynamic'

const SignUpPageAsync = dynamic(() => import('./SignUp.page'))
export default SignUpPageAsync
