'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { add, format } from 'date-fns'
import { AlarmClockCheck, CalendarClock, Clock } from 'lucide-react'
import type React from 'react'
import { type ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { calcDiferenceInMinutes } from '@/utils/parseHours'
import { type CalcInputsTypes, calcValidator } from '@/validators/calculate'
import { NewInput } from './NewInput'

const VALUES_LS_KEY = '@QuantoFalta:values'
const VALUES_WDT_KEY = '@QuantoFalta:tempo-diario-de-trabalho'

export const NewMainForm: React.FC = () => {
  const [minutesLeft, setMinutesLeft] = useState<number>(480)
  const [workDayTime, setWorkDayTime] = useState<number>(480)

  const formConfig = useForm({
    mode: 'all',
    resolver: yupResolver(calcValidator)
  })

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { errors }
  } = formConfig

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

    totalHoursWorked += calcDiferenceInMinutes(data.first, data?.second ?? '')
    totalHoursWorked += calcDiferenceInMinutes(data?.third ?? '', data?.fourth ?? '')

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
        className="flex w-full not-md:items-center md:justify-center space-x-2 not-md:flex-col"
      >
        <NewInput
          className="max-w-[204px]"
          label="Meta diária de trabalho em minutos"
          type="number"
          placeholder="480"
          required
          icon={AlarmClockCheck}
          value={workDayTime}
          error={errors?.['work-day-time']}
          {...register('work-day-time', { onChange: handleChangeWorkDayTime })}
        />

        <NewInput
          label="Horário de entrada"
          type="time"
          error={errors?.first}
          {...register('first')}
        />

        <NewInput
          label="Saída para o almoço"
          type="time"
          error={errors?.second}
          {...register('second')}
        />

        <NewInput
          label="Volta do almoço"
          type="time"
          error={errors?.third}
          {...register('third')}
        />

        <NewInput
          label="Final do expediente"
          type="time"
          error={errors?.fourth}
          {...register('fourth')}
        />

        <div className="flex items-end space-x-2 pb-1 max-md:pt-8 max-md:pb-4">
          <button type="submit" className="h-[36px] btn btn-primary">
            Calcular
          </button>

          <button className="h-[36px] btn btn-secondary" type="reset" onClick={handleReset}>
            Limpar
          </button>
        </div>
      </form>

      <div className="stats shadow max-vsm:stats-vertical">
        <div className="stat">
          <div className="stat-figure text-primary">
            <Clock />
          </div>
          <div className="stat-title">{percentage < 100 ? 'Faltam' : 'Tempo trabalhado'}</div>
          <div className="stat-value text-primary">
            {percentage < 100 ? minutesLeft : minutesLeft * -1 + workDayTime} min
          </div>
          <div className="stat-desc">
            {percentage < 100
              ? `da meta de ${workDayTime} min`
              : `${minutesLeft * -1} min de hora extra`}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <CalendarClock />
          </div>
          <div className="stat-title">
            {percentage < 100 ? 'Previsão de saída' : 'Liberdade cantou :)'}
          </div>
          <div className="stat-value text-secondary">
            {percentage < 100
              ? format(add(new Date(), { minutes: minutesLeft }), 'HH:mm')
              : '--:--'}
          </div>
          <div className="stat-desc">
            {percentage < 100 ? `${percentage}% concluído` : 'Bom trabalho!'}
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
