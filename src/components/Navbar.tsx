import Image from 'next/image'
import { FC } from 'react'
import logo from '../../public/logo.png'
import { ToggleThemeModeButton } from './ToggleThemeModeButton'

export const Navbar: FC = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <Image alt="Work Timer Logo" title="Work Timer" src={logo} height={28} width={28} />
        <span
          className="text-sm font-semibold tracking-tight"
          style={{ color: 'var(--color-foreground)' }}
        >
          Work Timer
        </span>
      </div>

      <ToggleThemeModeButton />
    </header>
  )
}
