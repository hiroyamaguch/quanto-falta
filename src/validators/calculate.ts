import * as yup from 'yup'

export const calcValidator = yup.object().shape({
  'work-day-time': yup.number().required('Duração do dia de trabalho é obrigatória'),
  periods: yup
    .array()
    .of(
      yup.object().shape({
        checkIn: yup.string().required('Entrada é obrigatória'),
        checkOut: yup.string().nullable(),
      })
    )
    .min(1)
    .required(),
})

export type PeriodType = {
  checkIn: string
  checkOut?: string | null
}

export type CalcInputsTypes = yup.InferType<typeof calcValidator>
