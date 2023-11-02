import { MainForm } from '@/components/MainForm'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-6 px-5">
      <h1 className="text-center font-sans text-2xl font-bold">
        Quanto falta?
      </h1>

      <p className="text-center font-sans">
        Calcule quanto tempo do expediente diário já foi realizado
      </p>

      <MainForm />
    </main>
  )
}
