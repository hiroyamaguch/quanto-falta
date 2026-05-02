'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { FC } from 'react'

export const ToggleThemeModeButton: FC = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
      className="flex cursor-pointer items-center gap-2 rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={
        {
          color: 'var(--color-muted)',
          '--tw-ring-color': 'var(--color-accent)',
          '--tw-ring-offset-color': 'var(--color-background)',
        } as React.CSSProperties
      }
    >
      {isDark ? (
        <Moon size={20} aria-hidden="true" />
      ) : (
        <Sun size={20} aria-hidden="true" />
      )}
    </button>
  )
}
