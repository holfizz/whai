export enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export enum EnumUserRole {
	Admin = 'ADMIN',
	Student = 'STUDENT',
	Creator = 'CREATOR'
}

export interface IUser {
	id: string
	email: string
	role: EnumUserRole
}

export type TypeAuth = {
	user: IUser | null
	accessToken: string | null
}

export type TypeNewTokensResponse = {
	getNewToken: TypeAuth
}
