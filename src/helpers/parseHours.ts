import { parse } from 'date-fns'

export const parseStringToDate = (value: string): Date => {
  const parsed = parse(value, 'HH:mm', new Date())

  return parsed
}
