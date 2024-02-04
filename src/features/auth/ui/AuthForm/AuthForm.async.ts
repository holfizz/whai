import { FC, lazy } from 'react'
import { AuthFormProps } from './AuthForm'

const AuthFormAsync = lazy<FC<AuthFormProps>>(() => import('./AuthForm'))
export default AuthFormAsync
