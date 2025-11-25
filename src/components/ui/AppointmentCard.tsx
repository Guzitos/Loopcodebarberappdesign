import { Appointment } from '../../utils/auth';
import { Clock, Calendar, User, Scissors } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
  showClient?: boolean;
  showBarber?: boolean;
}

export function AppointmentCard({ appointment, showClient, showBarber }: AppointmentCardProps) {
  const dateObj = new Date(appointment.date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });

  const serviceColors = {
    Corte: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    Barba: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    Combo: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
  };

  const colorClass = serviceColors[appointment.service as keyof typeof serviceColors] || serviceColors.Corte;

  return (
    <div className="glass-card rounded-2xl p-5 hover:border-[#6A00FF]/50 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {showClient && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#C5C5C5]" />
              <span className="text-white">{appointment.clientName}</span>
            </div>
          )}
          
          {showBarber && (
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#C5C5C5]" />
              <span className="text-white">{appointment.barberName}</span>
            </div>
          )}

          <div className="flex items-center gap-4 text-[#C5C5C5]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{appointment.time}</span>
            </div>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-xl bg-gradient-to-br ${colorClass} border`}>
          <span className="text-white text-sm">{appointment.service}</span>
        </div>
      </div>
    </div>
  );
}
