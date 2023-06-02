'use client'

import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from './Input'
import { calcValidator, CalcInputsTypes } from '@/validators/calc.validator'
import { parseStringToDate } from '@/helpers/parseHours'
import { differenceInMinutes } from 'date-fns'

export const Form: React.FC = () => {
  const formConfig = useForm<CalcInputsTypes>({
    mode: 'onChange',
    resolver: yupResolver(calcValidator),
  })

  const { handleSubmit } = formConfig

  const onSubmit: SubmitHandler<CalcInputsTypes> = (data) => {
    let totalHoursWorked = 0

    const parsedFirst = parseStringToDate(data.first)

    if (!data.second) {
      totalHoursWorked += differenceInMinutes(new Date(), parsedFirst)
    } else {
      const parsedSecond = parseStringToDate(data.second)

      totalHoursWorked += differenceInMinutes(parsedSecond, parsedFirst)
    }

    if (data.third && !data.fourth) {
      const parsedThird = parseStringToDate(data.third)

      totalHoursWorked += differenceInMinutes(new Date(), parsedThird)
    } else if (data.third && data.fourth) {
      const parsedThird = parseStringToDate(data.third)
      const parsedFourth = parseStringToDate(data.fourth)

      totalHoursWorked += differenceInMinutes(parsedFourth, parsedThird)
    }

    setHoursLeft(480 - totalHoursWorked)
  }

  const [hoursLeft, setHoursLeft] = useState(480)

  return (
    <FormProvider {...formConfig}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[300px] flex-col items-center space-y-6 "
      >
        <div className="flex w-full flex-col space-y-3 ">
          <Input name="first" label="Primeira entrada" type="time" />
          <Input name="second" label="Saída para o almoço" type="time" />
          <Input name="third" label="Volta do almoço" type="time" />
          <Input name="fourth" label="Final do expediente" type="time" />
        </div>

        <button
          type="submit"
          className="h-[50px] w-full rounded-md bg-orange-600 px-4 py-2 text-gray-600  transition-all delay-75 hover:bg-orange-500"
        >
          Calcular
        </button>

        {hoursLeft > 0 ? (
          <p className="text-center text-red-600">
            Faltam {hoursLeft} minutos para finalizar o expediente
          </p>
        ) : (
          <p className="text-center text-green-600">
            Seu expediente já foi finalizado e conseguiu {hoursLeft * -1}{' '}
            minutos de horas extras!
          </p>
        )}

        {hoursLeft > 0 ? (
          <iframe
            src="https://giphy.com/embed/Dh5q0sShxgp13DwrvG"
            width="480"
            height="296"
            className="giphy-embed"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            height="100%"
            src="https://giphy.com/embed/G96zgIcQn1L2xpmdxi/video"
            width="100%"
            allowFullScreen
          ></iframe>
        )}
      </form>
    </FormProvider>
  )
}
