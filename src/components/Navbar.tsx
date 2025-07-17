import Image from 'next/image'
import { FC } from 'react'
import logo from '../../public/logo.png'
import { ToggleThemeModeButton } from './ToggleThemeModeButton'

export const Navbar: FC = () => {
  return (
    <header className="navbar bg-base-300 shadow-sm fixed top-0 z-50 flex items-center justify-between px-4 h-[64px]">
      <Image
        alt="Logo do quanto falta"
        title="Quanto falta?"
        src={logo}
        height={48}
        width={48}
      ></Image>

      <h1>Quanto falta?</h1>

      <ToggleThemeModeButton />
    </header>
  )
}
