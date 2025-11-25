import { Navigate } from 'react-router';
import { getCurrentUser, UserRole } from '../utils/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
}
