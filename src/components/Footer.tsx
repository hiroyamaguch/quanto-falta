import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="flex flex-1 bg-base-300 items-center px-4 py-2 w-full fixed bottom-0 inset-shadow-2xs">
      <a
        className="link link-primary"
        target="_blank"
        rel="noopener"
        href="https://hiroyamaguch.vercel.app/"
      >
        Desenvolvido por: Hiroyuki Yamaguchi
      </a>
    </footer>
  )
}
