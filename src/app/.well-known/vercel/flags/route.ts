import { verifyAccess } from '@vercel/flags'
import { getProviderData, type KeyedFlagDefinitionType } from '@vercel/flags/next'
import { NextResponse, type NextRequest } from 'next/server'
import { realTimeUpdateFlag } from '@/flags'

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'))
  if (!access) return NextResponse.json(null, { status: 401 })

  return NextResponse.json(
    getProviderData({
      [realTimeUpdateFlag.key]: realTimeUpdateFlag as unknown as KeyedFlagDefinitionType,
    })
  )
}
