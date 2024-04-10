import dynamic from 'next/dynamic'

const ResetPasswordPageAsync = dynamic(() => import('./resetPassword.page'))

export default ResetPasswordPageAsync
