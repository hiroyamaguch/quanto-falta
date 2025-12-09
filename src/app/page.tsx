import { Footer } from '@/components/Footer'
import { MainForm } from '@/components/MainForm'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <main className="flex flex-col h-screen pt-16 pb-10">
      <Navbar />

      <MainForm />

      <Footer />
    </main>
  )
}
