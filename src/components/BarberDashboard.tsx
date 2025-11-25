import { useState } from 'react';
import { getCurrentUser, mockAppointments } from '../utils/auth';
import { DashboardHeader } from './ui/DashboardHeader';
import { GlassCard } from './ui/GlassCard';
import { GlassSelect } from './ui/GlassSelect';
import { AppointmentCard } from './ui/AppointmentCard';
import { Calendar } from 'lucide-react';

const availableDates = [
  '2025-11-25',
  '2025-11-26',
  '2025-11-27',
  '2025-11-28',
  '2025-11-29',
];

export function BarberDashboard() {
  const user = getCurrentUser();
  const [selectedDate, setSelectedDate] = useState('2025-11-26');

  const filteredAppointments = mockAppointments
    .filter(a => a.barberId === user?.id && a.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <DashboardHeader userName={user?.name || ''} userRole="barber" />

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Date Filter */}
        <GlassCard>
          <label className="block text-[#C5C5C5] mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Selecionar Data
          </label>
          <GlassSelect
            value={selectedDate}
            onChange={setSelectedDate}
            options={availableDates.map(d => {
              const dateObj = new Date(d + 'T00:00:00');
              return {
                label: dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }),
                value: d
              };
            })}
          />
        </GlassCard>

        {/* Appointments List */}
        <div>
          <h3 className="text-xl text-white mb-4">
            Agendamentos - {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { 
              day: 'numeric', 
              month: 'long' 
            })}
          </h3>
          {filteredAppointments.length === 0 ? (
            <GlassCard>
              <p className="text-[#C5C5C5] text-center py-8">
                Sem agendamentos para esta data
              </p>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} showClient />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
