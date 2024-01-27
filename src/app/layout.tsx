import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const inter = Montserrat({ subsets: ["latin", 'cyrillic-ext'], weight:['200','300','400','500','600','700','800'] });

export const metadata: Metadata = {
  title: "wh? - whai",
  description: "New generation artificial intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (



    <html lang="en">
      <body className={[inter.className, 'app'].join(' ')}>
        {children}
      </body>
    </html>

  );
}

