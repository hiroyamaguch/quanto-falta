'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC } from 'react'

export const ToggleThemeModeButton: FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <label htmlFor="theme-toggle" className="flex cursor-pointer items-center gap-2">
      <Moon size={20} aria-hidden="true" className="hidden md:block" />
      <input
        id="theme-toggle"
        type="checkbox"
        value="synthwave"
        checked={theme === 'light'}
        className="theme-controller toggle"
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      />
      <Sun size={20} aria-hidden="true" className="hidden md:block" />
    </label>
  )
}
