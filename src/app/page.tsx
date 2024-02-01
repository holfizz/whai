'use client'

import { useQuery } from '@tanstack/react-query'
import { AuthService } from '@/shared/api/auth/auth.service'
import { authConstants } from '@/shared/const/auth'
import { useCallback, useEffect, useState } from 'react'
import Input from '@/shared/ui/Input/Input'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {data} =useQuery({
    queryKey:["session"],
	  queryFn:()=>AuthService.main(authConstants.LOGIN,{email:"user@user.com",
		  password:"123123"} )
  })
  const onChangeEmail = useCallback((value:string)=>{
    setEmail(value)
  },[])
  const onChangePassword = useCallback((value:string)=>{
	  setPassword(value)

  },[])
  useEffect(()=>{
	  console.log(data)
  },[data])
  return <div>
    <Input value={email} onChange={onChangeEmail} type="text" placeholder={'email'}/>
    <Input value={password} onChange={onChangePassword} type="text" placeholder={'email'}/>
    {data?.user.email}
  </div>
}
