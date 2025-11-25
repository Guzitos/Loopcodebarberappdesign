import { Code } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6A00FF] to-[#0066FF] flex items-center justify-center shadow-2xl shadow-[#6A00FF]/50">
          <Code className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
        <div className="absolute -inset-2 bg-gradient-to-br from-[#6A00FF] to-[#0066FF] rounded-3xl blur-xl opacity-30 -z-10"></div>
      </div>
      <h1 className="text-4xl text-white tracking-tight">
        <span className="bg-gradient-to-r from-[#6A00FF] to-[#0066FF] bg-clip-text text-transparent">
          LOOP CODE
        </span>
      </h1>
    </div>
  );
}
