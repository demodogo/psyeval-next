import React from 'react';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, footer, className = '' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-100 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 w-full max-w-lg rounded-lg border border-muted/20 bg-background p-4 shadow-xl ${className}`} role="dialog" aria-modal>
        {title && <div className="mb-3 text-lg font-semibold text-foreground">{title}</div>}
        <div className="text-foreground/90">{children}</div>
        {footer && <div className="mt-4 flex justify-end gap-2 border-t border-muted/20 pt-3">{footer}</div>}
        <button type="button" className="absolute right-3 top-3 text-muted hover:text-foreground" aria-label="Close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};
