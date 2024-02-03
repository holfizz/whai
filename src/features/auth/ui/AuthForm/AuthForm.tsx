import { Dispatch, FC, memo, SetStateAction, useCallback, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AuthForm.module.scss'
import Button, { ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import Input, { InputSize, InputTheme } from '@/shared/ui/Input/Input'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import Loader from '@/shared/ui/Loader/Loader'
import { useMutation } from '@tanstack/react-query'
import { authConstants } from '@/shared/const/auth'
import { useTranslation } from 'react-i18next'
import { AuthService } from '@/shared/api/auth/auth.service'
import { useAuth } from '@/features/auth/model/auth.model'

export interface AuthFormProps {
  className?: string;
	type: authConstants.LOGIN | authConstants.REGISTER,
	setIsSuccess:Dispatch<SetStateAction<boolean>>
	setIsError:Dispatch<SetStateAction<boolean>>
}


const AuthForm: FC<AuthFormProps> = memo(({ className, type, setIsSuccess,setIsError  }) => {
  const {t} = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setIsLoading, getUser, isLoading} = useAuth()
  const { mutate:authMutate, error, data } = useMutation({
	  mutationKey:["user"],
    mutationFn:()=>AuthService.main(type, {email, password}),
	  onSuccess:()=> {
		  setIsLoading(false)
		  setIsSuccess(true)
	  },
	  onError:()=>{
		  setIsSuccess(true)
      setIsError(true)
	  }

  })

  const onChangePassword = useCallback((value:string)=>{
    setPassword(value)

  },[])
  const onChangeEmail = useCallback((value:string)=>{
	  setEmail(value)

  },[])
  const onAuthClick = useCallback(()=>{
    setIsLoading(true)
    if(type === authConstants.LOGIN) {
	    authMutate()
	    getUser(data)
    }
    if (type === authConstants.REGISTER){
	    authMutate()
    }
    setIsLoading(false)
  },[])
  if(isLoading){
    return (
      <div className={cls.loaderWrapper}>
        <Loader/>
      </div>
    )
  }
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text theme={!!error ? TextTheme.ERROR : !!data ? TextTheme.SUCCESS : TextTheme.PRIMARY} size={TextSize.XL}  title={type === authConstants.LOGIN ?t('log in') : t('register') }/>
      {
        error && <Text
          text={t('You entered an incorrect email or password')}
          theme={TextTheme.ERROR}/>
      }
      <Input
        size={InputSize.FULL}

        theme={InputTheme.OUTLINE}
        className={cls.input}
        placeholder={t("Enter email...")}
        type="text"
        onChange={onChangeEmail}
        value={email}
      />
      <Input
        size={InputSize.FULL}
        theme={InputTheme.OUTLINE}
        className={cls.input}
        placeholder={t("Enter password...")}
        type="text"
        onChange={onChangePassword}
        value={password}
      />
      <Button
        disabled={isLoading}
        onClick={onAuthClick}
        size={ButtonSize.FULL}
        theme={ButtonTheme.OUTLINE}
      >
        {type === authConstants.LOGIN ? t("log in") :t("register") }
      </Button>
    </div>
  )
})
export default AuthForm
