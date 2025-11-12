import React from 'react';

export type TextAreaProps =
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		label?: string;
		helperText?: string;
		error?: string;
		minRows?: number;
		id: string;
	};

const base =
	'min-h-28 resize-none w-full  rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-accent/25 focus:border-accent/60 disabled:opacity-60 disabled:cursor-not-allowed';

export function TextArea({
	label,
	helperText,
	error,
	minRows = 5,
	className = '',
	id,
	...rest
}: TextAreaProps) {
	return (
		<label
			className="text-foreground/90 grid gap-1"
			htmlFor={id}
		>
			{label && (
				<span className="text-xs font-medium tracking-wide">
					{label}
				</span>
			)}
			<textarea
				id={id}
				rows={minRows}
				className={`${base} ${error ? 'border-red-500/50' : ''} ${className}`}
				{...rest}
			/>
			{error ? (
				<span className="text-xs text-red-400">
					{error}
				</span>
			) : helperText ? (
				<span className="text-foreground/50 text-xs">
					{helperText}
				</span>
			) : null}
		</label>
	);
}
