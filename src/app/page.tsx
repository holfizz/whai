'use client'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

export default function Page() {
  const {toggleTheme, theme } = useTheme()
  return <div>
    <button onClick={()=>{
      toggleTheme()
	    console.log(theme)
    }}>{theme}</button>
    <h1>{theme}</h1>
  </div>
}
