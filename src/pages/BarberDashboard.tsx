
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Scissors, User, X, LogOut, Home, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageBarbers from '@/components/dashboard/ManageBarbers';
import ManagePrices from '@/components/dashboard/ManagePrices';

// Mock data para demonstração
const mockClients = [
  { id: 1, name: 'João Silva', service: 'Corte de cabelo', date: '15/03/2023', time: '14:00', confirmed: true },
  { id: 2, name: 'Pedro Santos', service: 'Barba', date: '15/03/2023', time: '15:30', confirmed: true },
  { id: 3, name: 'Carlos Oliveira', service: 'Corte + Barba', date: '15/03/2023', time: '17:00', confirmed: false },
  { id: 4, name: 'Lucas Mendes', service: 'Corte premium', date: '16/03/2023', time: '10:00', confirmed: true },
  { id: 5, name: 'André Costa', service: 'Barba + Hidratação', date: '16/03/2023', time: '11:30', confirmed: false },
];

const BarberDashboard = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState(mockClients);
  const [activeTab, setActiveTab] = useState('appointments');
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Função para alterar o status de confirmação
  const toggleConfirmation = (id: number) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === id ? { ...client, confirmed: !client.confirmed } : client
      )
    );
  };

  // Função para cancelar um agendamento
  const cancelAppointment = (id: number) => {
    setClients(prevClients => prevClients.filter(client => client.id !== id));
    toast({
      title: "Agendamento cancelado",
      description: "O agendamento foi cancelado com sucesso",
    });
  };

  return (
    <div className="min-h-screen bg-barbershop-black text-white pt-16 pb-12">
      <div className="border-b border-gray-800 bg-barbershop-lightgray/40">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <Scissors className="text-barbershop-neonblue h-6 w-6" />
            <h1 className="text-xl font-bold">NOIR</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-barbershop-textmuted text-sm mr-2">
              Olá, <span className="text-white">{user?.name || 'Barbeiro'}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/')}
              className="border-gray-700 text-white hover:bg-barbershop-lightgray flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Início</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="border-gray-700 text-red-500 hover:bg-barbershop-lightgray hover:text-red-400 flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl pt-6 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Calendar className="text-barbershop-neonblue h-8 w-8" />
            Painel do Barbeiro
          </h2>
        </div>
        
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-barbershop-lightgray border border-gray-800">
            <TabsTrigger 
              value="appointments" 
              className="data-[state=active]:bg-barbershop-neonblue data-[state=active]:text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger 
              value="clients" 
              className="data-[state=active]:bg-barbershop-neonblue data-[state=active]:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger 
              value="barbers" 
              className="data-[state=active]:bg-barbershop-neonblue data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Barbeiros
            </TabsTrigger>
            <TabsTrigger 
              value="prices" 
              className="data-[state=active]:bg-barbershop-neonblue data-[state=active]:text-white"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Preços
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-6">
            <div className="bg-barbershop-lightgray rounded-lg p-6 shadow-md border border-gray-800">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Agendamentos</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Total: {clients.length}</span>
                  <span className="text-sm text-green-500">Confirmados: {clients.filter(c => c.confirmed).length}</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>Lista de agendamentos</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.service}</TableCell>
                        <TableCell>{client.date}</TableCell>
                        <TableCell>{client.time}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${client.confirmed ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                            {client.confirmed ? 'Confirmado' : 'Pendente'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleConfirmation(client.id)}
                              className={client.confirmed ? 'text-red-500 hover:text-red-400 hover:bg-red-950/30' : 'text-green-500 hover:text-green-400 hover:bg-green-950/30'}
                            >
                              {client.confirmed ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => cancelAppointment(client.id)}
                              className="text-red-500 hover:text-red-400 hover:bg-red-950/30"
                            >
                              <span className="sr-only">Cancelar</span>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="mt-6">
            <div className="bg-barbershop-lightgray rounded-lg p-6 shadow-md border border-gray-800">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Lista de Clientes</h2>
                <div className="text-sm text-gray-400">Total: {clients.length}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clients.map((client) => (
                  <div key={client.id} className="bg-barbershop-black p-4 rounded-lg border border-gray-800">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-800 rounded-full p-2">
                        <User className="h-5 w-5 text-barbershop-neonblue" />
                      </div>
                      <div>
                        <h3 className="font-medium">{client.name}</h3>
                        <p className="text-sm text-gray-400">Último serviço: {client.service}</p>
                        <p className="text-xs text-gray-500 mt-1">Em {client.date} às {client.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="barbers" className="mt-6">
            <ManageBarbers />
          </TabsContent>

          <TabsContent value="prices" className="mt-6">
            <ManagePrices />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BarberDashboard;
