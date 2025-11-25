import { useState } from 'react';
import { getCurrentUser, mockUsers, mockAppointments, Appointment } from '../utils/auth';
import { DashboardHeader } from './ui/DashboardHeader';
import { GlassCard } from './ui/GlassCard';
import { GradientButton } from './ui/GradientButton';
import { GlassSelect } from './ui/GlassSelect';
import { AppointmentCard } from './ui/AppointmentCard';
import { Calendar, Clock, Scissors } from 'lucide-react';

const services = ['Corte', 'Barba', 'Combo'];
const barbers = mockUsers.filter(u => u.role === 'barber');
const availableDates = [
  '2025-11-26',
  '2025-11-27',
  '2025-11-28',
  '2025-11-29',
  '2025-11-30',
];
const availableTimes = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '15:30', '16:00', '17:00', '18:00'
];

export function ClientDashboard() {
  const user = getCurrentUser();
  const [service, setService] = useState('');
  const [barberId, setBarberId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(
    mockAppointments.filter(a => a.clientId === user?.id)
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmAppointment = () => {
    if (!service || !barberId || !date || !time) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const barber = barbers.find(b => b.id === barberId);
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      clientId: user!.id,
      clientName: user!.name,
      barberId,
      barberName: barber!.name,
      service,
      date,
      time,
    };

    setAppointments([...appointments, newAppointment]);
    mockAppointments.push(newAppointment);
    
    // Reset form
    setService('');
    setBarberId('');
    setDate('');
    setTime('');
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <DashboardHeader userName={user?.name || ''} />

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Booking Card */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6A00FF] to-[#0066FF] flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Agendar Corte</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[#C5C5C5] mb-2">Serviço</label>
              <GlassSelect value={service} onChange={setService} options={services} placeholder="Selecione o serviço" />
            </div>

            <div>
              <label className="block text-[#C5C5C5] mb-2">Barbeiro</label>
              <GlassSelect
                value={barberId}
                onChange={setBarberId}
                options={barbers.map(b => ({ label: b.name, value: b.id }))}
                placeholder="Selecione o barbeiro"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#C5C5C5] mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data
                </label>
                <GlassSelect
                  value={date}
                  onChange={setDate}
                  options={availableDates.map(d => {
                    const dateObj = new Date(d + 'T00:00:00');
                    return {
                      label: dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }),
                      value: d
                    };
                  })}
                  placeholder="Selecione a data"
                />
              </div>

              <div>
                <label className="block text-[#C5C5C5] mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horário
                </label>
                <GlassSelect value={time} onChange={setTime} options={availableTimes} placeholder="Selecione o horário" />
              </div>
            </div>

            {showSuccess && (
              <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 text-center">
                Agendamento confirmado com sucesso!
              </div>
            )}

            <GradientButton onClick={handleConfirmAppointment} fullWidth>
              Confirmar Agendamento
            </GradientButton>
          </div>
        </GlassCard>

        {/* Appointments List */}
        <div>
          <h3 className="text-xl text-white mb-4">Próximos Agendamentos</h3>
          {appointments.length === 0 ? (
            <GlassCard>
              <p className="text-[#C5C5C5] text-center py-8">
                Você ainda não tem agendamentos
              </p>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} showBarber />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
