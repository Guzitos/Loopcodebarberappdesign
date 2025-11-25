interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`glass-card rounded-3xl p-6 ${className}`}>
      {children}
    </div>
  );
}
