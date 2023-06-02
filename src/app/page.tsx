import { Form } from '@/components/Form'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-6 px-5">
      <h1 className="text-center font-sans text-xl font-medium">
        Calcule quantas horas faltam para sair do serviço
      </h1>

      <Form />
    </main>
  )
}
