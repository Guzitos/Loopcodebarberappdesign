import { ChevronDown } from 'lucide-react';

interface GlassSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[] | { label: string; value: string }[];
  placeholder?: string;
}

export function GlassSelect({ value, onChange, options, placeholder }: GlassSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-[#6A00FF40] rounded-2xl text-white appearance-none focus:outline-none focus:border-[#6A00FF] focus:ring-2 focus:ring-[#6A00FF]/20 transition-all cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const isString = typeof opt === 'string';
          const label = isString ? opt : opt.label;
          const val = isString ? opt : opt.value;
          return (
            <option key={val} value={val} className="bg-[#1a1a1f] text-white">
              {label}
            </option>
          );
        })}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5C5C5] pointer-events-none" />
    </div>
  );
}
