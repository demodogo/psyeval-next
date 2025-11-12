import React from 'react';

export type BadgeProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'muted' | 'success' | 'warning' | 'danger';
  className?: string;
};

const variantMap: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'bg-primary/15 text-gray-300 border-primary/30',
  accent: 'bg-accent/15 text-accent border-accent/30',
  muted: 'bg-muted/15 text-foreground border-muted/30',
  success: 'bg-green-500/15 text-green-700 border-green-500/30',
  warning: 'bg-yellow-500/15 text-yellow-700 border-yellow-500/30',
  danger: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'muted', className = '' }) => {
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${variantMap[variant]} ${className}`}>{children}</span>;
};
