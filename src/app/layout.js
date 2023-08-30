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
    <div className="flex items-center px-4 max-w-full h-14 bg-neutral-800">{children}</div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} 
      dark:bg-neutral-900 bg-neutral-100 text-black dark:text-white`}>
      <div className=''>
        <Header>
          <h1 className="text-xl font-sans font-bold font">.ID</h1>
        </Header>
      </div>
      <div className="container flex flex-row h-screen">
        <div className='w-48'>
          <NavBar>
            <NavItem link={'/propinsi'}>Propinsi</NavItem>
            <NavItem link={'/kabupaten'}>Kabupaten</NavItem>
            <NavItem link={'/kecamatan'}>Kecamatan</NavItem>
          </NavBar>
        </div>
        <div className='w-full p-5'>
          {children}
        </div>
      </div>
      </body>
    </html>
  )
}
