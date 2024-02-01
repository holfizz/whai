import { create } from 'zustand'
import { getLocalStorage } from '@/shared/lib/utils/localStorage'
import { IAuthResponse } from '@/entities/Profile/model/profile.types'
import { boolean } from 'zod'

const useStore = create((set) => ({
  user: getLocalStorage('user'),
  isLoading: false,
  getUser: () => set((state:IAuthResponse) => ({ user:state })),
  setIsLoading: () => set((state:boolean) => ({ isLoading:boolean })),
}))
