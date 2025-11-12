'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye } from 'lucide-react';

export type DisplayDropdownItem = string | { label: string; className?: string };

export interface DisplayDropdownProps {
  items: DisplayDropdownItem[];
  buttonLabel?: string;
  placeholderEmpty?: string;
  className?: string;
  maxHeight?: number;
  widthClass?: string;
  icon?: React.ReactNode;
}

export function DisplayDropdown({ items, buttonLabel, placeholderEmpty = 'Sin datos', className = '', maxHeight = 240, widthClass = 'w-52', icon }: DisplayDropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const GAP = 6;

  const updatePosition = () => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const menuEl = menuRef.current;
    const menuWidth = menuEl ? menuEl.getBoundingClientRect().width : btn.offsetWidth; // usa ancho real

    let left = rect.right - menuWidth;
    left = Math.min(Math.max(left, 8), vw - menuWidth - 8);

    let top = rect.bottom + GAP;
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
      const t = e.target as Node | null;
      if (!t) return;
      if (menuRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
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

  const renderItem = (item: DisplayDropdownItem, idx: number) => {
    const label = typeof item === 'string' ? item : item.label;
    const extraClass = typeof item === 'string' ? '' : item.className || '';
    const separator = idx > 0 ? 'border-t border-muted/20' : '';
    return (
      <div key={idx} role="listitem" className={`select-none px-2 py-1.5 text-xs text-foreground/90 ${separator} ${extraClass}`}>
        {label}
      </div>
    );
  };

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
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {buttonLabel ? (
          <span className="inline-flex items-center gap-1">
            {icon ?? <Eye size={14} />}
            <span>{buttonLabel}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1">
            {icon ?? <Eye size={14} />}
            <span>Ver</span>
          </span>
        )}
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            className={`fixed z-50 ${widthClass} rounded-md border border-muted/20 bg-background py-1 shadow-md overflow-y-auto`}
            style={{ top: coords.top, left: coords.left, maxHeight }}
          >
            {items.length === 0 ? <div className="px-2 py-1.5 text-xs text-muted italic">{placeholderEmpty}</div> : items.map(renderItem)}
          </div>,
          document.body
        )}
    </div>
  );
}

export default DisplayDropdown;
