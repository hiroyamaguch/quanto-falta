'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { add, format } from 'date-fns'
import type React from 'react'
import { type ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { calcDiferenceInMinutes } from '@/utils/parseHours'
import { type CalcInputsTypes, calcValidator } from '@/validators/calculate'
import { Input } from './Input'
import { ProgressLine } from './ProgressLine'

const VALUES_LS_KEY = '@QuantoFalta:values'
const VALUES_WDT_KEY = '@QuantoFalta:tempo-diario-de-trabalho'

export const MainForm: React.FC = () => {
  const [minutesLeft, setMinutesLeft] = useState<number>(480)
  const [workDayTime, setWorkDayTime] = useState<number>(480)

  const formConfig = useForm({
    mode: 'onChange',
    resolver: yupResolver(calcValidator)
  })

  const { handleSubmit, reset, setValue } = formConfig

  const percentage = useMemo(() => {
    const percentageLeft = (minutesLeft / workDayTime) * 100
    const percentage = 100 - Math.round(percentageLeft)

    return percentage
  }, [minutesLeft, workDayTime])

  const handleReset = useCallback(() => {
    setMinutesLeft(workDayTime)
    localStorage.removeItem(VALUES_LS_KEY)
    reset()
  }, [reset, workDayTime])

  const handleChangeWorkDayTime = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    localStorage.setItem(VALUES_WDT_KEY, value)

    setWorkDayTime(Number(value))
  }, [])

  const onSubmit: SubmitHandler<CalcInputsTypes> = (data) => {
    let totalHoursWorked = 0

    totalHoursWorked += calcDiferenceInMinutes(data.first, data.second)
    totalHoursWorked += calcDiferenceInMinutes(data.third, data.fourth)

    setMinutesLeft(workDayTime - totalHoursWorked)

    localStorage.setItem(VALUES_LS_KEY, JSON.stringify(data))
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: "This effect runs only once on mount."
  useEffect(() => {
    const workDayTimeOnLS = Number(localStorage?.getItem(VALUES_WDT_KEY) ?? 480)

    setMinutesLeft(workDayTimeOnLS)
    setWorkDayTime(workDayTimeOnLS)

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
          <Input
            name="work-day-time"
            label="Meta diária de trabalho em minutos"
            type="number"
            value={workDayTime}
            onChange={handleChangeWorkDayTime}
          />
        </div>

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
