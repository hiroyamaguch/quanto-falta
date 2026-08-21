import { encryptFlagValues } from 'flags'
import { FlagValues } from 'flags/react'
import { Suspense } from 'react'
import { Footer } from '@/components/Footer'
import { MainForm } from '@/components/MainForm'
import { Navbar } from '@/components/Navbar'
import { realTimeUpdateFlag } from '@/flags'

async function ConfidentialFlagValues({ values }: { values: Record<string, unknown> }) {
  const encrypted = await encryptFlagValues(values)
  return <FlagValues values={encrypted} />
}

export default async function Home() {
  const realtimeEnabled = await realTimeUpdateFlag()

  return (
    <>
      <Navbar />

      <main className="flex flex-1 justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-6xl flex-col gap-8">
          <header className="flex flex-col gap-3 border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--color-brand-text)' }}>
                  Painel de produtividade
                </span>
                <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  Acompanhe seu dia de trabalho
                </h1>
              </div>
              <p className="max-w-sm text-sm leading-6 sm:text-right" style={{ color: 'var(--color-muted)' }}>
                Registre seus intervalos e veja em um só lugar quanto falta para cumprir sua meta.
              </p>
            </div>
          </header>

          <section aria-label="Resumo e registro do expediente">
            <MainForm realtimeEnabled={realtimeEnabled} />
          </section>
        </div>
      </main>

      <Footer />

      <Suspense fallback={null}>
        <ConfidentialFlagValues values={{ [realTimeUpdateFlag.key]: realtimeEnabled }} />
      </Suspense>
    </>
  )
}
