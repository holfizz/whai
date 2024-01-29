import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '@/app/(styles)/index.scss'
import { ThemeProvider } from '@/app/(providers)/ThemeProvider'
import Body from '@/app/body'
import '../shared/config/i18n/i18n'

const montserrat = Montserrat({ subsets: ["latin", 'cyrillic-ext'], weight:['200','300','400','500','600','700','800'] })
export const metadata: Metadata = {
  title: "wh? - whai",
  description: "New generation artificial intelligence",
}
function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html className={montserrat.className} lang="en">
        <head>
          <link rel="icon" href="/whai.png" sizes="any" />
        </head>
        <Body className={montserrat.className}>

          {children}

        </Body>
      </html>
    </ThemeProvider>
  )
}

export default RootLayout
