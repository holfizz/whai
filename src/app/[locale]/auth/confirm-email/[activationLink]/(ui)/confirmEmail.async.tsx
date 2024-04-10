import dynamic from 'next/dynamic'

const ConfirmEmailPageAsync = dynamic(() => import('./confirmEmail.page'))
export default ConfirmEmailPageAsync
