import { create } from 'zustand'
import { getLocalStorage } from '@/shared/lib/utils/localStorage'
import { IAuthResponse } from '@/entities/Profile/model/profile.types'
import { persist } from 'zustand/middleware'

interface useAuthState {
	user: IAuthResponse | undefined | null
}

interface useAuthActions {
	setUser: (user: IAuthResponse | undefined | null) => void
	logout: () => void
}

type useAuthProps = useAuthState & useAuthActions

export const useAuth = create<useAuthProps>()(
	persist(
		set => ({
			user: getLocalStorage('user'),
			setUser: user => set(() => ({ user: user })),
			logout: () => set(() => ({ user: null })),
		}),
		{ name: 'authData' },
	),
)
