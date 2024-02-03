import { create } from 'zustand'
import { getLocalStorage } from '@/shared/lib/utils/localStorage'
import { IAuthResponse } from '@/entities/Profile/model/profile.types'
import { persist } from 'zustand/middleware'


interface useAuthState {
	user: IAuthResponse | undefined | null
	isLoading: boolean
}

interface useAuthActions {
	getUser: (user:IAuthResponse | undefined | null) => void
	setIsLoading: (isLoading:boolean) => void
	logout: () => void
}

type useAuthProps = useAuthState & useAuthActions

export const useAuth = create<useAuthProps>()(persist((set) => ({
  user: getLocalStorage('user'),
  isLoading: false,
  getUser: (user) => set(() => ({ user:user })),
  setIsLoading: (isLoading) => set(() => ({ isLoading:isLoading })),
  logout: () => set(() => ({user:null })),
}), { name: "authData" }))
