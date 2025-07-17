import { ElementType, FC, HTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface NewInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  className?: HTMLAttributes<HTMLFieldSetElement>['className']
  error?: FieldError | undefined
  icon?: ElementType
}

export const NewInput: FC<NewInputProps> = ({ label, className, icon: Icon, error, ...rest }) => {
  return (
    <fieldset className={twMerge('fieldset', className)}>
      <legend className="fieldset-legend">{label}</legend>

      <label className="input">
        {Icon && <Icon />}
        <input {...rest} />
      </label>
    </fieldset>
  )
}
