import React from 'react';

export type Column<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string | number;
  emptyText?: React.ReactNode;
  className?: string;
};

export function Table<T>({ columns, data, rowKey, emptyText = 'Sin datos', className = '' }: TableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-md border border-muted/20 ${className}`}>
      <table className="min-w-full divide-y divide-muted/20">
        <thead className="bg-background/60">
          <tr>
            {columns.map((col, ci) => (
              <th
                key={ci}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-muted/10">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-sm text-muted">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, ri) => (
              <tr key={rowKey ? rowKey(row, ri) : ri} className="hover:bg-background/40">
                {columns.map((col, ci) => (
                  <td key={ci} className={`px-4 py-2 text-sm text-foreground ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}>
                    {'render' in col && col.render ? col.render(row, ri) : (row as any)[col.key as any]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
