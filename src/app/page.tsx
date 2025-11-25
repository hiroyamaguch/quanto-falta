import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { NewMainForm } from '@/components/NewMainForm'

export default function Home() {
  return (
    <main className="flex flex-col h-screen pt-16 pb-10">
      <Navbar />

      <NewMainForm />

      <Footer />
    </main>
  )
}
