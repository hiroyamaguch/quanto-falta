import { differenceInMinutes, parse } from 'date-fns'

const parseStringToDate = (value: string): Date => {
  const parsed = parse(value, 'HH:mm', new Date())

  return parsed
}

export function calcDiferenceInMinutes(start: string | undefined, end: string | undefined): number {
  if (!start && !end) {
    return 0
  }

  const parsedStart = parseStringToDate(start ?? '')
  const parsedEnd = parseStringToDate(end ?? '')

  return differenceInMinutes(end ? parsedEnd : new Date(), parsedStart)
}
