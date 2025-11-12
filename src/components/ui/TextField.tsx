import React from 'react';
import { ErrorMessage } from '@components/ui';

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const base =
  'w-full rounded-md border border-primary/30 bg-white/[0.02] px-3 py-2 text-sm text-foreground shadow-sm transition-all placeholder:text-white/40 hover:border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary-dark/30 disabled:cursor-not-allowed disabled:opacity-50';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  id?: string;
  LeftIcon?: LucideIcon;
  RightIcon?: LucideIcon;
  iconActive?: boolean;
  iconClick?: () => void;
};

export function TextField({ label, helperText, error, className = '', iconClick, autoComplete = 'off', id, LeftIcon, RightIcon, iconActive = false, ...rest }: TextFieldProps) {
  const hasLeft = Boolean(LeftIcon);
  const hasRight = Boolean(RightIcon);
  const paddingLeft = hasLeft ? 'pl-8' : '';
  const paddingRight = hasRight ? 'pr-8' : '';
  const iconColorClass = iconActive ? 'text-primary' : 'text-foreground/60';

  return (
    <label className="text-foreground/90 grid gap-1" htmlFor={id}>
      {label && <span className="text-xs font-medium tracking-wide">{label}</span>}
      <div className="relative">
        {LeftIcon && (
          <span className={`${iconColorClass} ${iconClick ? '' : 'pointer-events-none'} absolute top-1/2 left-2 -translate-y-1/2`}>
            <LeftIcon className="h-5 w-5" aria-hidden onClick={iconClick ? iconClick : undefined} />
          </span>
        )}
        <input id={id} autoComplete={autoComplete} className={`${base} ${paddingLeft} ${paddingRight} px-3 ${error ? 'border-red-500/50' : ''} ${className}`} {...rest} />
        {RightIcon && (
          <span onClick={iconClick ? iconClick : undefined} className={`${iconColorClass} ${iconClick ? '' : 'pointer-events-none'} absolute top-1/2 right-2 -translate-y-1/2`}>
            <RightIcon className="h-5 w-5" aria-hidden />
          </span>
        )}
      </div>
      {error ? <ErrorMessage message={error} /> : helperText ? <span className="text-foreground/50 text-xs">{helperText}</span> : null}
    </label>
  );
}
