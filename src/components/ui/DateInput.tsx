import React from 'react';

export type DateInputDarkProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  id: string;
};

export function DateInput({ label, helperText, error, className = '', id, ...rest }: DateInputDarkProps) {
  const openPicker = () => (document.getElementById(id) as HTMLInputElement | null)?.showPicker?.();
  return (
    <label className="text-foreground/90 grid gap-1" htmlFor={id}>
      {label && <span className="text-xs font-medium tracking-wide">{label}</span>}
      <div className={`relative ${className}`}>
        <input
          id={id}
          type="date"
          className={
            'text-foreground  h-9 w-full rounded-lg  border border-primary/30 shadow-sm transition-all placeholder:text-white/40 hover:border-primary/20 bg-white/[0.02]  pr-3 pl-9 text-sm  md:h-10 ' +
            'focus:outline-none focus:ring-1 focus:ring-primary-dark/30 disabled:cursor-not-allowed disabled:opacity-50'
          }
          {...rest}
        />
        <svg
          className="text-foreground/60 pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4.5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 9.5h18" />
        </svg>
        <button type="button" onClick={openPicker} className="absolute top-0 left-0 h-full w-8 rounded-l-lg" aria-label="Abrir calendario" />
      </div>
      {error ? <span className="text-xs text-red-400">{error}</span> : helperText ? <span className="text-foreground/50 text-xs">{helperText}</span> : null}
    </label>
  );
}
