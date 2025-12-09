import { ElementType, FC, HTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  className?: HTMLAttributes<HTMLFieldSetElement>['className']
  error?: FieldError | undefined
  icon?: ElementType
}

export const Input: FC<InputProps> = ({ label, className, icon: Icon, error, ...rest }) => {
  return (
    <fieldset className={twMerge('fieldset not-md:w-[204px]', className)}>
      <legend className="fieldset-legend">{label}</legend>

      <label className="input">
        {Icon && <Icon />}
        <input {...rest} className="block" />
      </label>
    </fieldset>
  )
}
