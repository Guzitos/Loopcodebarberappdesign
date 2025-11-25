import { User } from '../../utils/auth';
import { User as UserIcon, Mail, Shield, Scissors } from 'lucide-react';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const roleIcons = {
    client: UserIcon,
    barber: Scissors,
    admin: Shield,
  };

  const roleLabels = {
    client: 'Cliente',
    barber: 'Barbeiro',
    admin: 'Admin',
  };

  const roleColors = {
    client: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    barber: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    admin: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
  };

  const RoleIcon = roleIcons[user.role];
  const colorClass = roleColors[user.role];

  return (
    <div className="glass-card rounded-2xl p-5 hover:border-[#6A00FF]/50 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} border flex items-center justify-center shrink-0`}>
          <RoleIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white truncate">{user.name}</h4>
          <p className="text-xs text-[#C5C5C5]">{roleLabels[user.role]}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-[#C5C5C5] text-sm">
        <Mail className="w-4 h-4 shrink-0" />
        <span className="truncate">{user.email}</span>
      </div>
    </div>
  );
}
