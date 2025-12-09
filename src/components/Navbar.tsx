import Image from 'next/image'
import { FC } from 'react'
import logo from '../../public/logo.png'
import { ToggleThemeModeButton } from './ToggleThemeModeButton'

export const Navbar: FC = () => {
  return (
    <header className="navbar bg-base-300 shadow-sm fixed top-0 z-50 flex items-center justify-between px-4 h-16">
      <Image alt="Work Timer Logo" title="Work Timer" src={logo} height={48} width={48}></Image>

      <h1>Work Timer</h1>

      <ToggleThemeModeButton />
    </header>
  )
}
