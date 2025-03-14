
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app this would come from a backend
const MOCK_USER = {
  email: 'barbeiro@noir.com',
  password: 'barbeiro123',
  name: 'Carlos Silva',
  role: 'barber'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in (via localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('barber_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const userData = { name: MOCK_USER.name, role: MOCK_USER.role };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('barber_user', JSON.stringify(userData));
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo, ${MOCK_USER.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Falha no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('barber_user');
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
