import { Footer } from '@/components/Footer'
import { MainForm } from '@/components/MainForm'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex flex-1 items-center justify-center py-8">
        <MainForm />
      </main>

      <Footer />
    </>
  )
}
