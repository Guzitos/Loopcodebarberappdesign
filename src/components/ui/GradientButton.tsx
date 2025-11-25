import { ButtonHTMLAttributes } from 'react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function GradientButton({ 
  children, 
  fullWidth = false, 
  className = '', 
  ...props 
}: GradientButtonProps) {
  return (
    <button
      className={`px-6 py-3 bg-gradient-to-r from-[#6A00FF] to-[#0066FF] text-white rounded-2xl transition-all hover:shadow-lg hover:shadow-[#6A00FF]/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
