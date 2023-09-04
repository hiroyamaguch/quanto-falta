import { Form } from '@/components/Form'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-6 px-5">
      <h1 className="text-center font-sans text-2xl font-bold">
        Quanto falta?
      </h1>

      <h3 className="text-center font-sans">
        Calcule quanto tempo do expediente diário já foi realizado
      </h3>

      <Form />
    </main>
  )
}
