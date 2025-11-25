'use client'

import type React from 'react'
import { type InputHTMLAttributes, useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const [hasFocus, setHasFocus] = useState(false)

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const errorMessage: string | undefined = errors?.[name]?.message?.toString()

  const hasError = useMemo((): boolean => !!errorMessage, [errorMessage])

  const handleFocus = useCallback(() => {
    setHasFocus(true)
  }, [])

  const handleBlur = useCallback(() => {
    setHasFocus(false)
  }, [])

  const borderFocusColor = hasFocus ? 'border-orange-600' : 'border-transparent'

  return (
    <label className="flex w-full items-center justify-between space-x-4" htmlFor={label}>
      {label && (
        <div className="flex-col items-center justify-start">
          <p className="text-black">{label}</p>

          {hasError && <p className="pt-1 text-sm text-red-600">{errorMessage}</p>}
        </div>
      )}
      <input
        id={label}
        type="text"
        className={`h-12 max-w-[120px] rounded-lg border-2 bg-input-600 px-4 py-2 outline-hidden ${borderFocusColor}`}
        autoComplete="off"
        onFocus={handleFocus}
        {...register(name, { onBlur: handleBlur })}
        {...rest}
      />
    </label>
  )
}
