'use client'

import React, { InputHTMLAttributes, useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  mask?: string
  containerStyle?: Record<string, unknown>
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  mask,
  containerStyle = {},
  ...rest
}) => {
  const { register } = useFormContext()

  const [hasFocus, setHasFocus] = useState(false)

  const handleFocus = useCallback(() => {
    setHasFocus(true)
  }, [])

  const handleBlur = useCallback(() => {
    setHasFocus(false)
  }, [])

  const borderFocusColor = hasFocus ? 'border-orange-600' : 'border-transparent'

  return (
    <div className="flex items-center justify-center space-x-4">
      {label && <p>{label}</p>}
      <div
        className={`relative rounded-lg border-2 ${borderFocusColor}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <input
          type="text"
          className="h-[48px] w-full rounded-lg bg-input-600 px-4 py-2 outline-none"
          autoComplete="off"
          {...register(name)}
          {...rest}
        />
      </div>
    </div>
  )
}
