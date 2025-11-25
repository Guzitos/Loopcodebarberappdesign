export type UserRole = 'client' | 'barber' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  barberId: string;
  barberName: string;
  service: string;
  date: string;
  time: string;
}

// Mock data
export const mockUsers: User[] = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', role: 'client' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', role: 'client' },
  { id: '3', name: 'Pedro Barbeiro', email: 'pedro@barber.com', role: 'barber' },
  { id: '4', name: 'Lucas Barbeiro', email: 'lucas@barber.com', role: 'barber' },
  { id: '5', name: 'Admin System', email: 'admin@loopcode.com', role: 'admin' },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'João Silva',
    barberId: '3',
    barberName: 'Pedro Barbeiro',
    service: 'Corte',
    date: '2025-11-26',
    time: '14:00',
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Maria Santos',
    barberId: '3',
    barberName: 'Pedro Barbeiro',
    service: 'Combo',
    date: '2025-11-26',
    time: '15:30',
  },
  {
    id: '3',
    clientId: '1',
    clientName: 'João Silva',
    barberId: '4',
    barberName: 'Lucas Barbeiro',
    service: 'Barba',
    date: '2025-11-27',
    time: '10:00',
  },
];

// Auth helpers
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const login = (email: string, password: string): User | null => {
  // Mock login - in production, validate against backend
  const user = mockUsers.find(u => u.email === email);
  if (user && password) {
    setCurrentUser(user);
    return user;
  }
  return null;
};

export const register = (name: string, email: string, password: string): User | null => {
  // Mock registration
  if (name && email && password) {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'client',
    };
    mockUsers.push(newUser);
    setCurrentUser(newUser);
    return newUser;
  }
  return null;
};
