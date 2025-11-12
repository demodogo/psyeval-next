import React from 'react';

export type ErrorMessageProps = {
	message?: string;
	icon?: React.ReactNode;
	className?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	message,
	icon,
	className = '',
}) => {
	if (!message) return null;
	return (
		<div
			className={`mt-1 inline-flex items-center gap-2 text-sm text-red-400 ${className}`}
			role="alert"
		>
			{icon ?? (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<line
						x1="12"
						y1="16"
						x2="12.01"
						y2="16"
					/>
				</svg>
			)}
			<span>{message}</span>
		</div>
	);
};
