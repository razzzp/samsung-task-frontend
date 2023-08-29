import './globals.css'
import { Inter } from 'next/font/google'
import { NavBar, NavItem } from './navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Samsung Task',
  description: 'Indonesia Merdeka',
}
export function Header({children}){
  return (
    <div>{children}</div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header>.ID</Header>
      <NavBar>
        <NavItem link={'/test'}>First</NavItem>
        <NavItem link={'/'}>Second</NavItem>
        <NavItem link={'/'}>Third</NavItem>
      </NavBar>
        {children}
      </body>
    </html>
  )
}
