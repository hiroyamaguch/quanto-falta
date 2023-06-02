import * as yup from 'yup'

export type CalcInputsTypes = {
  first: string
  second: string
  third: string
  fourth: string
}

export const calcValidator = yup.object().shape({
  first: yup.string().required('Primeiro é obrigatório'),
  second: yup.string(),
  third: yup.string(),
  fourth: yup.string(),
})
