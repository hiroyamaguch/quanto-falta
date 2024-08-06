'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { parseStringToDate } from '@/utils/parseHours'
import { CalcInputsTypes, calcValidator } from '@/validators/calculate'
import { add, differenceInMinutes, format } from 'date-fns'
import { Input } from './Input'
import { ProgressLine } from './ProgressLine'

const VALUES_LS_KEY = '@QuantoFalta:values'

export const MainForm: React.FC = () => {
  const [minutesLeft, setMinutesLeft] = useState(480)

  const formConfig = useForm<CalcInputsTypes>({
    mode: 'onChange',
    resolver: yupResolver(calcValidator)
  })

  const { handleSubmit, reset, setValue } = formConfig

  const percentage = useMemo(() => {
    const percentageLeft = (minutesLeft / 480) * 100
    const percentage = 100 - Math.round(percentageLeft)

    return percentage
  }, [minutesLeft])

  const handleReset = useCallback(() => {
    setMinutesLeft(480)
    localStorage.removeItem(VALUES_LS_KEY)
    reset()
  }, [reset])

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

    setMinutesLeft(480 - totalHoursWorked)
    localStorage.setItem(VALUES_LS_KEY, JSON.stringify(data))
  }

  useEffect(() => {
    const data = localStorage.getItem(VALUES_LS_KEY)

    if (data) {
      const dataParsed = JSON.parse(data) as CalcInputsTypes

      setValue('first', dataParsed.first)
      setValue('second', dataParsed.second)
      setValue('third', dataParsed.third)
      setValue('fourth', dataParsed.fourth)

      onSubmit(dataParsed)
    }
  }, [setValue])

  return (
    <FormProvider {...formConfig}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[300px] flex-col items-center space-y-6"
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

        <button className="hover:underline" type="reset" onClick={handleReset}>
          limpar formulário
        </button>

        <ProgressLine percentage={percentage} />

        <ul className="text-center">
          <li>
            {percentage < 100
              ? `Faltam ${minutesLeft} minutos`
              : `Foi realizado ${minutesLeft * -1} minutos de horas extras`}
          </li>
          {percentage < 100 && (
            <li>Previsão de saída: {format(add(new Date(), { minutes: minutesLeft }), 'HH:mm')}</li>
          )}
        </ul>
      </form>
    </FormProvider>
  )
}
