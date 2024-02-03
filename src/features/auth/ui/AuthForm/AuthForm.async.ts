import { FC, lazy } from 'react'
import { AuthFormProps } from './AuthForm'

const AuthFormAsync = lazy<FC<AuthFormProps>>(
  () =>
    new Promise((res) => {
      setTimeout(() => {
        res(import("./AuthForm"))
      }, 1500)
    })
)
export default AuthFormAsync
