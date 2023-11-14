import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Login from './component/Login'
import AuthSession from './session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: "/favicon.ico"
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const session = await getServerSession(authOptions)
  // console.log(session)

  // 로그인한 정보가 session 에 담긴다.

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          <Login />
          {children}
        </AuthSession>
        </body>
    </html>
  )
}
