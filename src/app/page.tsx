'use client'

import { useAuth } from '@/features/auth/model/auth.model'

export default function Page() {
	const { user } = useAuth()
	return <div>{user?.user.email}</div>
}
