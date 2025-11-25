import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { login } from '../utils/auth';
import { GradientButton } from './ui/GradientButton';
import { GlassInput } from './ui/GlassInput';
import { Logo } from './ui/Logo';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = login(email, password);
    if (user) {
      navigate(`/${user.role}`);
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-12">
          <Logo />
        </div>

        <div className="glass-card rounded-3xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#C5C5C5] mb-2">Email</label>
              <GlassInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-[#C5C5C5] mb-2">Senha</label>
              <div className="relative">
                <GlassInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5C5C5] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-center text-sm">{error}</div>
            )}

            <GradientButton type="submit" fullWidth>
              Entrar
            </GradientButton>

            <div className="text-center">
              <Link
                to="/register"
                className="text-[#C5C5C5] hover:text-white transition-colors"
              >
                Criar conta
              </Link>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-[#C5C5C5] text-center mb-2">Contas de teste:</p>
              <p className="text-xs text-[#C5C5C5] text-center">
                Cliente: joao@email.com
              </p>
              <p className="text-xs text-[#C5C5C5] text-center">
                Barbeiro: pedro@barber.com
              </p>
              <p className="text-xs text-[#C5C5C5] text-center">
                Admin: admin@loopcode.com
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
