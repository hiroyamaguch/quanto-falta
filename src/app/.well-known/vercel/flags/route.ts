import { verifyAccess } from 'flags'
import { getProviderData, type KeyedFlagDefinitionType } from 'flags/next'
import { type NextRequest, NextResponse } from 'next/server'
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
