import dynamic from 'next/dynamic'

const ForgotPasswordPageAsync = dynamic(() => import('./forgotPassword.page'))
export default ForgotPasswordPageAsync
