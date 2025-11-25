import { getCurrentUser, mockUsers } from '../utils/auth';
import { DashboardHeader } from './ui/DashboardHeader';
import { GlassCard } from './ui/GlassCard';
import { UserCard } from './ui/UserCard';
import { Users, Shield } from 'lucide-react';

export function AdminDashboard() {
  const user = getCurrentUser();

  const roleLabels = {
    client: 'Cliente',
    barber: 'Barbeiro',
    admin: 'Admin',
  };

  const groupedUsers = {
    admin: mockUsers.filter(u => u.role === 'admin'),
    barber: mockUsers.filter(u => u.role === 'barber'),
    client: mockUsers.filter(u => u.role === 'client'),
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <DashboardHeader userName={user?.name || ''} userRole="admin" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6A00FF] to-[#0066FF] flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl text-white">Admin Panel</h1>
            <p className="text-[#C5C5C5]">LOOP CODE</p>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedUsers).map(([role, users]) => (
            <div key={role}>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#C5C5C5]" />
                <h3 className="text-xl text-white">{roleLabels[role as keyof typeof roleLabels]}</h3>
                <span className="text-[#C5C5C5] ml-2">({users.length})</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((u) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <GlassCard className="mt-8">
          <div className="text-center text-[#C5C5C5] space-y-2">
            <p>Modo somente leitura</p>
            <p className="text-sm">Total de usuários: {mockUsers.length}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
