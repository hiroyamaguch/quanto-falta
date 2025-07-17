import * as yup from 'yup'

export const calcValidator = yup.object().shape({
  first: yup.string().required('Primeira entrada é obrigatória'),
  second: yup.string().nullable(),
  third: yup.string().nullable(),
  fourth: yup.string().nullable(),
  'work-day-time': yup.number().required('Primeira entrada é obrigatória')
})

export type CalcInputsTypes = yup.InferType<typeof calcValidator>
