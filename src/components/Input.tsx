import { ElementType, FC, HTMLAttributes, InputHTMLAttributes, useId } from 'react'
import { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  className?: HTMLAttributes<HTMLDivElement>['className']
  error?: FieldError | undefined
  icon?: ElementType
}

export const Input: FC<InputProps> = ({ label, className, icon: Icon, error, id, ...rest }) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className={twMerge('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={inputId}
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-muted)' }}
      >
        {label}
      </label>

      <div
        className="flex items-center gap-2 px-3 h-10 rounded-lg transition-all focus-within:outline-none"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border)',
        }}
        onFocus={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = 'var(--color-accent)'
          el.style.boxShadow = '0 0 0 3px var(--color-accent-muted)'
        }}
        onBlur={e => {
          // only reset if focus moves outside this container
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            const el = e.currentTarget as HTMLDivElement
            el.style.borderColor = 'var(--color-border)'
            el.style.boxShadow = 'none'
          }
        }}
      >
        {Icon && (
          <Icon
            size={14}
            style={{ color: 'var(--color-muted)', flexShrink: 0 }}
            aria-hidden="true"
          />
        )}
        <input
          {...rest}
          id={inputId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          suppressHydrationWarning
          className="flex-1 bg-transparent text-sm outline-none w-full min-w-0"
          style={{ color: 'var(--color-foreground)' }}
        />
      </div>

      {error && (
        <span id={errorId} role="alert" className="text-xs" style={{ color: 'var(--color-warning)' }}>
          {error.message}
        </span>
      )}
    </div>
  )
}
