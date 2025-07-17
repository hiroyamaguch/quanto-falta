'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC } from 'react'

export const ToggleThemeModeButton: FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <label className="flex cursor-pointer items-center gap-2">
      <Moon size={20} className="hidden md:block" />
      <input
        id="theme-toggle"
        type="checkbox"
        value="synthwave"
        checked={theme === 'light'}
        className="theme-controller toggle"
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <Sun size={20} className="hidden md:block" />
    </label>
  )
}
