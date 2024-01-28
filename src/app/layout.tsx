import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './styles/index.scss'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import Navbar from '@/widgets/Navbar'
import Body from '@/app/body'
import Sidebar from '@/widgets/Sidebar/ui/Sidebar'

const montserrat = Montserrat({ subsets: ["latin", 'cyrillic-ext'], weight:['200','300','400','500','600','700','800'] })

export const metadata: Metadata = {
  title: "wh? - whai",
  description: "New generation artificial intelligence",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ThemeProvider>
      <html className={montserrat.className} lang="en">
        <Body className={montserrat.className}>
          <Navbar />
          <div className={'app_wrapper'}>
            <Sidebar/>
            <div className={'content_wrapper'}>
              {children}
            </div>
          </div>
        </Body>
      </html>
    </ThemeProvider>
  )
}

