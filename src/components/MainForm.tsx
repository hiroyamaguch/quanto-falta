'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { add, format } from 'date-fns'
import type React from 'react'
import { type ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { LuAlarmClockCheck, LuClock, LuPlus, LuRotateCcw, LuTrash2, LuZap } from 'react-icons/lu'
import { calcDiferenceInMinutes } from '@/utils/parseHours'
import { type CalcInputsTypes, calcValidator } from '@/validators/calculate'
import { Input } from './Input'

const VALUES_LS_KEY = 'form-values-v2'
const VALUES_WDT_KEY = 'workday-time'
const REALTIME_KEY = 'realtime-mode'

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const DEFAULT_PERIODS = [{ checkIn: '', checkOut: '' }]

interface MainFormProps {
  realtimeEnabled: boolean
}

export const MainForm: React.FC<MainFormProps> = ({ realtimeEnabled }) => {
  const [minutesLeft, setMinutesLeft] = useState<number>(480)
  const [workDayTime, setWorkDayTime] = useState<number>(480)
  const [now, setNow] = useState<Date | null>(null)
  const [realtimeMode, setRealtimeMode] = useState<boolean>(false)
  const [lastCalculatedAt, setLastCalculatedAt] = useState<Date | null>(null)
  const [submittedPeriods, setSubmittedPeriods] =
    useState<CalcInputsTypes['periods']>(DEFAULT_PERIODS)
  const [notificationFired, setNotificationFired] = useState<boolean>(false)

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    control,
    formState: { errors }
  } = useForm<CalcInputsTypes>({
    mode: 'all',
    resolver: yupResolver(calcValidator),
    defaultValues: {
      'work-day-time': 480,
      periods: DEFAULT_PERIODS
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'periods'
  })

  const percentage = useMemo(() => {
    const percentageLeft = (minutesLeft / workDayTime) * 100
    return Math.min(100, Math.max(0, 100 - Math.round(percentageLeft)))
  }, [minutesLeft, workDayTime])

  const isOvertime = minutesLeft < 0
  const isDone = minutesLeft <= 0

  const handleReset = useCallback(() => {
    setMinutesLeft(workDayTime)
    localStorage.removeItem(VALUES_LS_KEY)
    reset({
      'work-day-time': workDayTime,
      periods: DEFAULT_PERIODS
    })
  }, [reset, workDayTime])

  const handleChangeWorkDayTime = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    localStorage.setItem(VALUES_WDT_KEY, value)
    setWorkDayTime(Number(value))
  }, [])

  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) return
    if (Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }, [])

  const fireWorkDoneNotification = useCallback((): boolean => {
    if (!('Notification' in window)) return false
    if (Notification.permission !== 'granted') return false
    new Notification('Work Timer', {
      body: 'Work goal reached! Good work!',
      icon: '/favicon.ico'
    })
    return true
  }, [])

  const computeMinutesLeft = useCallback((periods: CalcInputsTypes['periods'], wdt: number) => {
    let totalHoursWorked = 0
    for (const period of periods) {
      totalHoursWorked += calcDiferenceInMinutes(period.checkIn, period.checkOut ?? '')
    }
    return wdt - totalHoursWorked
  }, [])

  const onSubmit: SubmitHandler<CalcInputsTypes> = (data) => {
    setMinutesLeft(computeMinutesLeft(data.periods, workDayTime))
    setSubmittedPeriods(data.periods)
    setLastCalculatedAt(new Date())
    setNow(new Date())
    setNotificationFired(false)
    localStorage.setItem(VALUES_LS_KEY, JSON.stringify(data))
  }

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data)
    requestNotificationPermission()
  })

  const toggleRealtimeMode = useCallback(() => {
    setRealtimeMode((prev) => {
      const newValue = !prev
      localStorage.setItem(REALTIME_KEY, String(newValue))
      return newValue
    })
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: "This effect runs only once on mount."
  useEffect(() => {
    const workDayTimeOnLS = Number(localStorage?.getItem(VALUES_WDT_KEY) ?? 480)
    setMinutesLeft(workDayTimeOnLS)
    setWorkDayTime(workDayTimeOnLS)

    const realtimeOnLS = realtimeEnabled && localStorage?.getItem(REALTIME_KEY) === 'true'
    setRealtimeMode(realtimeOnLS)

    const data = localStorage.getItem(VALUES_LS_KEY)
    if (data) {
      const dataParsed = JSON.parse(data) as CalcInputsTypes
      setValue('work-day-time', dataParsed['work-day-time'])
      setValue('periods', dataParsed.periods)
      onSubmit(dataParsed)
    } else {
      setNow(new Date())
    }
  }, [setValue])

  // Fire browser notification when work goal is reached
  useEffect(() => {
    if (minutesLeft <= 0 && !notificationFired && lastCalculatedAt !== null) {
      const wasFired = fireWorkDoneNotification()
      if (wasFired) {
        setNotificationFired(true)
      }
    }
  }, [minutesLeft, notificationFired, lastCalculatedAt, fireWorkDoneNotification])

  // Real-time mode: update minutes left every minute (only when feature flag is enabled)
  useEffect(() => {
    if (!realtimeEnabled || !realtimeMode || !lastCalculatedAt) return

    const updateMinutes = () => {
      setMinutesLeft(computeMinutesLeft(submittedPeriods, workDayTime))
      setNow(new Date())
    }

    updateMinutes()
    const interval = setInterval(updateMinutes, 60000)

    return () => clearInterval(interval)
  }, [
    realtimeMode,
    lastCalculatedAt,
    submittedPeriods,
    workDayTime,
    realtimeEnabled,
    computeMinutesLeft
  ])

  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE
  const ringColor = isDone ? 'var(--color-success)' : 'var(--color-brand)'

  const estimatedEnd = !isDone && now ? format(add(now, { minutes: minutesLeft }), 'HH:mm') : null

  return (
    <div
      className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4 py-6"
      suppressHydrationWarning
    >
      {/* Stats card */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label={
          isDone
            ? isOvertime
              ? `Work done. ${Math.abs(minutesLeft)} minutes of overtime.`
              : 'Work done. Good work!'
            : `${percentage}% done. ${minutesLeft} minutes left of ${workDayTime} minute goal.${estimatedEnd ? ` Estimated end: ${estimatedEnd}.` : ''}`
        }
        className="w-full rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* Circular progress */}
        <div className="relative shrink-0 flex items-center justify-center" aria-hidden="true">
          <svg width="128" height="128" viewBox="0 0 128 128" aria-hidden="true" focusable="false">
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke={ringColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 64 64)"
              style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-3xl font-bold tabular-nums leading-none"
              style={{ color: isDone ? 'var(--color-success)' : 'var(--color-foreground)' }}
            >
              {percentage}%
            </span>
          </div>
        </div>

        {/* Stats text */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          {isDone ? (
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-success)' }}
              >
                Work Done
              </span>
              <span className="text-4xl font-bold" style={{ color: 'var(--color-success)' }}>
                Good work! 🎉
              </span>
              {isOvertime && (
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  +{Math.abs(minutesLeft)} min of overtime
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-muted)' }}
              >
                Time Left
              </span>
              <span
                className="text-4xl font-bold tabular-nums"
                style={{ color: 'var(--color-foreground)' }}
              >
                {minutesLeft}{' '}
                <span className="text-xl font-medium" style={{ color: 'var(--color-muted)' }}>
                  min
                </span>
              </span>
              <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                of {workDayTime} min goal
              </span>
            </div>
          )}

          {estimatedEnd && (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 w-fit"
              style={{
                backgroundColor: 'var(--color-brand-muted)',
                border: '1px solid rgba(59,130,246,0.2)'
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-brand-text)' }}
              >
                Est. end
              </span>
              <span
                className="text-lg font-bold tabular-nums"
                style={{ color: 'var(--color-brand-text)' }}
              >
                {estimatedEnd}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Form card */}
      <div
        className="w-full rounded-xl p-6"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <form
          id="calc-hours"
          onSubmit={handleFormSubmit}
          suppressHydrationWarning
          className="flex flex-col gap-5"
        >
          {/* Workday time - full width */}
          <Input
            label="Workday duration (min)"
            type="number"
            placeholder="480"
            required
            icon={LuAlarmClockCheck}
            value={workDayTime}
            error={errors?.['work-day-time']}
            {...register('work-day-time', { onChange: handleChangeWorkDayTime })}
          />

          {/* Dynamic periods */}
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => {
              const periodErrors = errors?.periods?.[index]
              const isFirst = index === 0
              const checkInLabel = isFirst ? 'Check-in' : `Check-in ${index + 1}`
              const checkOutLabel = isFirst ? 'Check-out' : `Check-out ${index + 1}`

              return (
                <div key={field.id} className="flex items-end gap-2">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <Input
                      label={checkInLabel}
                      type="time"
                      error={periodErrors?.checkIn}
                      {...register(`periods.${index}.checkIn`)}
                    />
                    <Input
                      label={checkOutLabel}
                      type="time"
                      error={periodErrors?.checkOut}
                      {...register(`periods.${index}.checkOut`)}
                    />
                  </div>

                  {/* Remove button — only shown when there's more than one period */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index)
                      }}
                      aria-label={`Remove period ${index + 1}`}
                      className="flex items-center justify-center h-10 w-10 shrink-0 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 mb-0.5"
                      style={{
                        backgroundColor: 'var(--color-surface-raised)',
                        color: 'var(--color-muted)',
                        border: '1px solid var(--color-border)',
                        // @ts-expect-error CSS custom property
                        '--tw-ring-color': 'var(--color-warning)',
                        '--tw-ring-offset-color': 'var(--color-background)'
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement
                        btn.style.color = 'var(--color-warning)'
                        btn.style.borderColor = 'var(--color-warning)'
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement
                        btn.style.color = 'var(--color-muted)'
                        btn.style.borderColor = 'var(--color-border)'
                      }}
                    >
                      <LuTrash2 size={14} aria-hidden="true" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {/* Add period button */}
          <button
            type="button"
            onClick={() => {
              append({ checkIn: '', checkOut: '' })
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              color: 'var(--color-muted)',
              border: '1px solid var(--color-border)',
              // @ts-expect-error CSS custom property
              '--tw-ring-color': 'var(--color-brand)',
              '--tw-ring-offset-color': 'var(--color-background)'
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.color = 'var(--color-brand-text)'
              btn.style.borderColor = 'var(--color-brand)'
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.color = 'var(--color-muted)'
              btn.style.borderColor = 'var(--color-border)'
            }}
          >
            <LuPlus size={14} aria-hidden="true" />
            Add period
          </button>
        </form>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
          <button
            type="submit"
            form="calc-hours"
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: 'var(--color-brand)',
              color: 'var(--color-brand-foreground)',
              // @ts-expect-error CSS custom property
              '--tw-ring-color': 'var(--color-brand)',
              '--tw-ring-offset-color': 'var(--color-background)'
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'var(--color-brand-hover)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-brand)')
            }
            suppressHydrationWarning
          >
            <LuZap size={14} aria-hidden="true" />
            Calculate
          </button>

          <button
            type="reset"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              color: 'var(--color-muted)',
              border: '1px solid var(--color-border)',
              // @ts-expect-error CSS custom property
              '--tw-ring-color': 'var(--color-muted)',
              '--tw-ring-offset-color': 'var(--color-background)'
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.color = 'var(--color-foreground)'
              btn.style.borderColor = 'var(--color-muted)'
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.color = 'var(--color-muted)'
              btn.style.borderColor = 'var(--color-border)'
            }}
          >
            <LuRotateCcw size={14} aria-hidden="true" />
            Reset
          </button>

          {realtimeEnabled && (
            <button
              type="button"
              onClick={toggleRealtimeMode}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:ml-auto"
              style={{
                backgroundColor: realtimeMode
                  ? 'var(--color-success-muted)'
                  : 'var(--color-surface-raised)',
                color: realtimeMode ? 'var(--color-success)' : 'var(--color-muted)',
                border: `1px solid ${realtimeMode ? 'var(--color-success)' : 'var(--color-border)'}`,
                // @ts-expect-error CSS custom property
                '--tw-ring-color': realtimeMode ? 'var(--color-success)' : 'var(--color-muted)',
                '--tw-ring-offset-color': 'var(--color-background)'
              }}
              aria-pressed={realtimeMode}
              title={realtimeMode ? 'Disable real-time updates' : 'Enable real-time updates'}
            >
              <LuClock size={14} aria-hidden="true" />
              {realtimeMode ? 'Real-time ON' : 'Real-time'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
