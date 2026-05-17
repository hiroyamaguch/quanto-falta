'use client'

import { useSentryToolbar } from '@sentry/toolbar'

export function SentryToolbar() {
  useSentryToolbar({
    enabled: process.env.NODE_ENV === 'development',
    initProps: {
      organizationSlug: 'hiroyamaguch',
      projectIdOrSlug: 'quanto-falta',
      environment: process.env.NODE_ENV
    }
  })

  return null
}
