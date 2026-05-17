import { flag } from '@vercel/flags/next'

export const realTimeUpdateFlag = flag<boolean>({
  key: 'real-time-update',
  defaultValue: false,
  description: 'Enables the real-time update button and auto-refresh logic in the main form.',
  options: [
    { value: false, label: 'Disabled' },
    { value: true, label: 'Enabled' },
  ],
  decide() {
    return this.defaultValue as boolean
  },
})
