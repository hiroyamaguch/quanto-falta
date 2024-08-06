import * as yup from 'yup'

export const calcValidator = yup.object().shape({
  first: yup.string().required('Primeira entrada é obrigatória'),
  second: yup.string(),
  third: yup.string(),
  fourth: yup.string()
})

export type CalcInputsTypes = yup.InferType<typeof calcValidator>
