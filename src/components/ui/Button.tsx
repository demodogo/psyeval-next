import React from 'react';

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  LeftIcon?: LucideIcon;
  RightIcon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  LeftIcon,
  RightIcon,
  loading = false,
  disabled,
  size = 'md',
  type = 'button',
  ...rest
}: ButtonProps) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-normal tracking-wide transition-colors focus:outline-none focus:ring-2';
  const variants: Record<typeof variant, string> = {
    primary: 'bg-primary text-background hover:bg-primary/90',
    secondary: 'bg-accent text-background hover:bg-accent/90',
    ghost: 'bg-transparent text-foreground hover:bg-foreground/5 focus:ring-accent',
    outline: 'border border-muted/30 bg-transparent text-foreground hover:border-accent focus:ring-accent',
  } as const;

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2',
    lg: 'px-4 py-3',
  } as const;

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  } as const;

  const isDisabled = disabled || loading;

  return (
    <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${isDisabled ? 'cursor-not-allowed opacity-70' : ''} ${className}`} disabled={isDisabled} {...rest}>
      {LeftIcon && <LeftIcon className={iconSizes[size]} aria-hidden />}
      <span>{loading ? 'Cargando…' : children}</span>
      {RightIcon && <RightIcon className={iconSizes[size]} aria-hidden />}
    </button>
  );
};
