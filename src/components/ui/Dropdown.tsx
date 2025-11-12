'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';

export type DropdownItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
};

export type DropdownProps = {
  items: DropdownItem[];
  buttonLabel?: string;
  className?: string;
};

export function Dropdown({ items, buttonLabel, className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const MENU_WIDTH = 144; // Tailwind w-36 ≈ 144px
  const GAP = 6;

  const updatePosition = () => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = rect.right - MENU_WIDTH;
    left = Math.min(Math.max(left, 8), vw - MENU_WIDTH - 8);

    let top = rect.bottom + GAP;
    const menuEl = menuRef.current;
    const menuH = menuEl ? menuEl.getBoundingClientRect().height : 0;
    if (menuH && rect.bottom + GAP + menuH > vh - 8) {
      top = Math.max(rect.top - GAP - menuH, 8);
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (menuRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };

    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  const toggle = () => setOpen((v) => !v);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (!open) setTimeout(updatePosition, 0);
          toggle();
        }}
        className="border-muted/30 hover:bg-background/60 inline-flex items-center gap-1 rounded border px-2 py-1 text-xs"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {buttonLabel ? <span>{buttonLabel}</span> : <MoreVertical size={16} />}
      </button>

      {open &&
        createPortal(
          <div ref={menuRef} className="fixed z-50 w-36 rounded-md border border-muted/20 bg-background p-1 shadow-md" role="menu" style={{ top: coords.top, left: coords.left }}>
            {items.map((item, idx) => {
              const base = 'flex w-full items-center rounded px-2 py-1.5 text-left text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-primary/40';
              const variant = item.disabled
                ? 'cursor-not-allowed text-muted hover:bg-transparent'
                : item.danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-foreground hover:bg-gray-100';
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={!!item.disabled}
                  aria-disabled={!!item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    setOpen(false);
                    item.onClick();
                  }}
                  className={`${base} ${variant} ${item.className ?? ''}`}
                  role="menuitem"
                >
                  {item.label}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}
