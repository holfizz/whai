import { z } from 'zod'
import { ProfileData, ProfileState } from '@/entities/Profile/model/profile.contracts'

export interface IUser {
	id: number
	email: string
	isAdmin: boolean
	isActivated:boolean
	activationLink:string
}
export type IUserData = z.infer<typeof ProfileData>

export type IUserState = z.infer<typeof ProfileState>


export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
