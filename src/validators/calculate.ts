import * as yup from 'yup'

const timeToMinutes = (value: string): number => {
  const [h, m] = value.split(':').map(Number)
  return h * 60 + m
}

export const calcValidator = yup.object().shape({
  'work-day-time': yup
    .number()
    .typeError('Workday duration is required')
    .required('Workday duration is required')
    .moreThan(0, 'Workday duration must be greater than 0'),
  periods: yup
    .array()
    .of(
      yup.object().shape({
        checkIn: yup.string().required('Check-in is required'),
        checkOut: yup
          .string()
          .nullable()
          .test('after-check-in', 'Check-out must be after check-in', function (value) {
            if (!value) return true
            const { checkIn } = this.parent as { checkIn?: string }
            if (!checkIn) return true
            return timeToMinutes(value) > timeToMinutes(checkIn)
          }),
      })
    )
    .min(1)
    .required()
    .test('check-out-required-except-last', '', function (periods) {
      if (!periods) return true
      for (let i = 0; i < periods.length - 1; i++) {
        if (!periods[i].checkOut) {
          return this.createError({
            path: `${this.path}.${i}.checkOut`,
            message: 'Check-out is required',
          })
        }
      }
      return true
    })
    .test('chronological-order', '', function (periods) {
      if (!periods) return true
      for (let i = 1; i < periods.length; i++) {
        const prev = periods[i - 1]
        const curr = periods[i]
        if (!prev.checkOut || !curr.checkIn) continue
        if (timeToMinutes(curr.checkIn) < timeToMinutes(prev.checkOut)) {
          return this.createError({
            path: `${this.path}.${i}.checkIn`,
            message: 'Must be after previous check-out',
          })
        }
      }
      return true
    }),
})

export type PeriodType = {
  checkIn: string
  checkOut?: string | null
}

export type CalcInputsTypes = yup.InferType<typeof calcValidator>
