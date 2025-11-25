import { InputHTMLAttributes } from 'react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function GlassInput({ className = '', ...props }: GlassInputProps) {
  return (
    <input
      className={`w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-[#6A00FF40] rounded-2xl text-white placeholder:text-[#C5C5C5]/50 focus:outline-none focus:border-[#6A00FF] focus:ring-2 focus:ring-[#6A00FF]/20 transition-all ${className}`}
      {...props}
    />
  );
}
