import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="flex flex-1 space-x-4 bg-base-300 items-center justify-center px-4 py-2 w-full fixed bottom-0 inset-shadow-2xs">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <Image
            src="https://avatars.githubusercontent.com/u/31856074?v=4"
            alt="Hiroyuki Yamaguchi"
            width={32}
            height={32}
          />
        </div>
      </div>

      <a
        className="link"
        target="_blank"
        aria-label="Hiroyuki Yamaguchi Portfolio"
        rel="noopener"
        href="https://hiroyamaguch.vercel.app/"
      >
        <p>Hiroyuki Yamaguchi</p>
      </a>

      <a
        href="https://github.com/hiroyamaguch"
        target="_blank"
        aria-label="Hiroyuki Yamaguchi Github"
        rel="noopener noreferrer"
      >
        <Github />
      </a>

      <a
        href="https://instagram.com/hiroyamaguch/"
        target="_blank"
        aria-label="Hiroyuki Yamaguchi Instagram"
        rel="noopener noreferrer"
      >
        <Instagram />
      </a>

      <a
        href="https://linkedin.com/in/hiroyamaguch/"
        target="_blank"
        aria-label="Hiroyuki Yamaguchi LinkedIn"
        rel="noopener noreferrer"
      >
        <Linkedin />
      </a>

      <a
        href="mailto:hiroyamaguch@proton.me"
        target="_blank"
        aria-label="Hiroyuki Yamaguchi Email"
        rel="noopener noreferrer"
      >
        <Mail />
      </a>
    </footer>
  )
}
