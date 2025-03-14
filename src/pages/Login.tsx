
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/barber-dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-barbershop-black text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-barbershop-lightgray rounded-lg p-8 shadow-lg border border-gray-800">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Scissors className="w-12 h-12 text-barbershop-neonblue" />
          <h1 className="text-3xl font-bold">NOIR</h1>
          <p className="text-barbershop-textmuted text-sm text-center">
            Área restrita para barbeiros. Entre com suas credenciais abaixo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-barbershop-black border-gray-700"
                placeholder="seu.email@exemplo.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-barbershop-black border-gray-700"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-barbershop-neonblue hover:bg-barbershop-neonblue/80"
            disabled={isLoading}
          >
            {isLoading ? "Autenticando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-barbershop-neonblue hover:underline text-sm">
            Voltar para o site
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-xs text-center text-gray-500">
          <p>Credenciais de demonstração:</p>
          <p>Email: barbeiro@noir.com</p>
          <p>Senha: barbeiro123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
