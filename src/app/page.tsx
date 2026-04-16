import { Footer } from '@/components/Footer'
import { MainForm } from '@/components/MainForm'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen pt-14 pb-12">
      <Navbar />

      <div className="flex flex-1 items-center justify-center py-8">
        <MainForm />
      </div>

      <Footer />
    </main>
  )
}
