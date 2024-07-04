'use client'
import {NextUIProvider} from '@nextui-org/react'
import {ReactNode} from 'react'
import {ApolloProviders} from '../(providers)/ApolloProvider'
import AuthProvider from "@/app/(providers)/AuthProvider"

export function AppProvider({children}: { children: ReactNode }) {
 
  return (
    <ApolloProviders>
      <NextUIProvider>

        <AuthProvider>
            {children}
          </AuthProvider>
      </NextUIProvider>
    </ApolloProviders>
  )
}
