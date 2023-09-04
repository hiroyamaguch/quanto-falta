import React, { FC, useEffect, useState } from 'react'

interface ProgressLineProps {
  percentage: number
}

export const ProgressLine: FC<ProgressLineProps> = ({ percentage }) => {
  const [percentageLabel, setPercentageLabel] = useState<string>('100%')

  useEffect(() => {
    requestAnimationFrame(() => {
      setPercentageLabel(`${percentage}%`)
    })
  }, [percentage])

  return (
    <div className="flex w-full space-x-2">
      <div className="flex h-6 w-full justify-start rounded-full border border-white-600 p-1">
        <div
          className="h-full rounded-full bg-green-600 duration-[2s] ease-in-out"
          style={{ width: percentageLabel }}
        />
      </div>

      <p>{percentageLabel}</p>
    </div>
  )
}
