import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { register } from '../utils/auth';
import { GradientButton } from './ui/GradientButton';
import { GlassInput } from './ui/GlassInput';
import { Logo } from './ui/Logo';
import { Eye, EyeOff } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    const user = register(name, email, password);
    if (user) {
      navigate('/client');
    } else {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-12">
          <Logo />
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h2 className="text-2xl text-white text-center mb-6">Criar Conta</h2>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-[#C5C5C5] mb-2">Nome</label>
              <GlassInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>

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

            <div>
              <label className="block text-[#C5C5C5] mb-2">Confirmar Senha</label>
              <GlassInput
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-center text-sm">{error}</div>
            )}

            <GradientButton type="submit" fullWidth>
              Cadastrar
            </GradientButton>

            <div className="text-center">
              <Link
                to="/login"
                className="text-[#C5C5C5] hover:text-white transition-colors"
              >
                Já tem uma conta? Entre aqui
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
