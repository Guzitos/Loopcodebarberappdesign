import { useNavigate } from 'react-router';
import { logout } from '../../utils/auth';
import { LogOut, User, Scissors, Shield } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  userRole?: 'client' | 'barber' | 'admin';
}

export function DashboardHeader({ userName, userRole = 'client' }: DashboardHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleIcons = {
    client: User,
    barber: Scissors,
    admin: Shield,
  };

  const RoleIcon = roleIcons[userRole];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0D0D0F]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6A00FF] to-[#0066FF] flex items-center justify-center">
            <RoleIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white">Olá, {userName}</p>
            <p className="text-xs text-[#C5C5C5]">LOOP CODE</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-[#C5C5C5] hover:text-white hover:border-[#6A00FF40] transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </header>
  );
}
