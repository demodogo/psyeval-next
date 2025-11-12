import React from 'react';
import { Check } from 'lucide-react';

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  id: string;
  label?: string;
  uncheckedBgClass?: string;
  uncheckedBorderClass?: string;
  checkedBgClass?: string;
  checkedBorderClass?: string;
  tickColorClass?: string;
  useLucideIcon?: boolean;
};

export function Checkbox({
  label,
  className = '',
  id,
  uncheckedBgClass = 'bg-neutral-100 dark:bg-neutral-600',
  uncheckedBorderClass = 'border-neutral-400 dark:border-neutral-600',
  checkedBgClass = 'peer-checked:bg-primary',
  checkedBorderClass = 'peer-checked:border-primary/80',
  tickColorClass = 'text-white',
  useLucideIcon = true,
  ...rest
}: CheckboxProps) {
  return (
    <label htmlFor={id} className={`group inline-flex items-center gap-2 ${className}`}>
      <input id={id} type="checkbox" className="peer sr-only" {...rest} />
      <span
        aria-hidden
        className={`mt-0.5 grid h-4.5 w-4.5 place-items-center rounded-[6px] shadow-sm shadow-inner/10 transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-accent/30 peer-focus-visible:outline-none peer-disabled:opacity-50 peer-disabled:cursor-not-allowed ${uncheckedBorderClass} ${uncheckedBgClass} ${checkedBgClass} ${checkedBorderClass} dark:border-primary-dark group-hover:border-primary-dark dark:group-border-primary-dark [&>svg]:opacity-0 [&>svg]:transition peer-checked:[&>svg]:opacity-100`}
      >
        {useLucideIcon ? (
          <Check className={`h-3 w-3 ${tickColorClass}`} strokeWidth={3} />
        ) : (
          <svg className={`h-3 w-3 ${tickColorClass}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M4 10l4 4 8-8" />
          </svg>
        )}
      </span>
      {label && <span className="text-foreground/90 text-sm select-text dark:text-foreground/90">{label}</span>}
    </label>
  );
}
