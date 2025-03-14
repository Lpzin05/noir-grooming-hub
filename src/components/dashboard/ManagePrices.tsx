
import React, { useState } from 'react';
import { DollarSign, Save, Scissors, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Dados de exemplo para serviços
const initialServices = [
  { id: 1, name: "Corte de Cabelo", price: "R$ 50", duration: "30 min" },
  { id: 2, name: "Barba Completa", price: "R$ 40", duration: "25 min" },
  { id: 3, name: "Sobrancelha", price: "R$ 20", duration: "15 min" },
  { id: 4, name: "Combo Cabelo + Barba", price: "R$ 80", duration: "50 min" },
  { id: 5, name: "Tratamento Facial", price: "R$ 70", duration: "40 min" }
];

type Service = typeof initialServices[0];

const ManagePrices = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedPrice, setEditedPrice] = useState<string>("");
  const { toast } = useToast();

  const handleEditPrice = (id: number, currentPrice: string) => {
    setEditingId(id);
    setEditedPrice(currentPrice.replace('R$ ', ''));
  };

  const handleSavePrice = (id: number) => {
    // Validar a entrada de preço
    if (!editedPrice.trim() || isNaN(Number(editedPrice))) {
      toast({
        title: "Preço inválido",
        description: "Por favor, insira um valor numérico válido",
        variant: "destructive"
      });
      return;
    }

    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, price: `R$ ${editedPrice}` } : service
      )
    );
    
    setEditingId(null);
    setEditedPrice("");
    
    toast({
      title: "Preço atualizado",
      description: "O valor do serviço foi atualizado com sucesso"
    });
  };

  return (
    <div className="bg-barbershop-lightgray rounded-lg p-6 shadow-md border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-barbershop-neonblue" />
          Gerenciar Preços dos Serviços
        </h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Lista de serviços e preços</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Serviço</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium flex items-center">
                  <Scissors className="h-4 w-4 mr-2 text-barbershop-neonblue" />
                  {service.name}
                </TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>
                  {editingId === service.id ? (
                    <div className="flex items-center">
                      <span className="mr-2">R$</span>
                      <Input
                        className="w-20 h-8 bg-barbershop-black border-gray-700"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSavePrice(service.id)}
                        autoFocus
                      />
                    </div>
                  ) : (
                    service.price
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === service.id ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSavePrice(service.id)}
                      className="text-green-500 hover:text-green-400 hover:bg-green-950/30"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPrice(service.id, service.price)}
                      className="text-barbershop-neonblue hover:text-barbershop-neonblue/80 hover:bg-barbershop-neonblue/10"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <div className="bg-barbershop-black p-4 rounded-lg border border-gray-800">
          <h3 className="text-lg font-medium mb-2">Dicas para precificação</h3>
          <ul className="list-disc list-inside text-barbershop-textmuted space-y-2">
            <li>Considere o tempo gasto em cada serviço ao definir o preço</li>
            <li>Avalie os preços da concorrência na sua região</li>
            <li>Lembre-se de incluir o custo dos produtos utilizados</li>
            <li>Considere criar pacotes promocionais para atrair mais clientes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagePrices;
