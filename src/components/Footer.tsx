'use client'

import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 px-6 h-12"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0"
        style={{ border: '1px solid var(--color-border)' }}
      >
        <Image
          src="https://avatars.githubusercontent.com/u/31856074?v=4"
          alt="Hiroyuki Yamaguchi"
          width={24}
          height={24}
        />
      </div>

      <a
        className="text-xs font-medium transition-colors"
        style={{ color: 'var(--color-muted)' }}
        target="_blank"
        aria-label="Hiroyuki Yamaguchi Portfolio"
        rel="noopener noreferrer"
        href="https://hiroyamaguch.vercel.app/"
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
      >
        Hiroyuki Yamaguchi
      </a>

      <div
        className="h-3 w-px"
        style={{ backgroundColor: 'var(--color-border)' }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-3">
        {[
          { href: 'https://github.com/hiroyamaguch', Icon: Github, label: 'GitHub' },
          { href: 'https://instagram.com/hiroyamaguch/', Icon: Instagram, label: 'Instagram' },
          { href: 'https://linkedin.com/in/hiroyamaguch/', Icon: Linkedin, label: 'LinkedIn' },
          { href: 'mailto:hiroyamaguch@proton.me', Icon: Mail, label: 'Email' },
        ].map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Hiroyuki Yamaguchi ${label}`}
            className="transition-colors"
            style={{ color: 'var(--color-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
    </footer>
  )
}
