import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { NewMainForm } from '@/components/NewMainForm'

export default function Home() {
  return (
    <main className="flex flex-col pt-[64px] pb-[40px]">
      <Navbar />

      <div className="flex flex-col space-y-4 items-center max-w-[1320px] w-full m-auto px-4 py-4">
        <NewMainForm />
      </div>

      <Footer />
    </main>
  )
}
