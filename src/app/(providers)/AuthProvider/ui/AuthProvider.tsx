'use client'
import {ReactNode, useEffect, useState} from 'react'
import {useGetProfile} from "@/entities/Auth/model/auth.queries"
import Loader from "@/shared/ui/Loader/Loader"

const AuthProvider = ({children}: { children: ReactNode }) => {
  const {userData, errorProfile} = useGetProfile()
  const [isProfileLoaded, setIsProfileLoaded] = useState(false)

  useEffect(() => {
    if (userData || errorProfile) {
      setIsProfileLoaded(true)
    }
  }, [userData, errorProfile])

  if (!isProfileLoaded && !userData?.email) {
    return (
      <div className="flex absolute justify-center items-center h-full w-full bg-[var(--color-decor-4)]">
        <Loader/>
      </div>
    )
  }
  return <>{children}</>
}

export default AuthProvider
