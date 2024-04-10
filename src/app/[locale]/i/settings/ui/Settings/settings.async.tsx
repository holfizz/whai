import dynamic from 'next/dynamic'

const SettingsPageAsync = dynamic(() => import('./settings.page'))
export default SettingsPageAsync
