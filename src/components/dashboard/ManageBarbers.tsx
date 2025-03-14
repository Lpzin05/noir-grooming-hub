
import React, { useState } from 'react';
import { User, Trash2, Plus, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock data for barbers
const initialBarbers = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Master Barber",
    photo: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    instagram: "@carlosbarber"
  },
  {
    id: 2,
    name: "André Martins",
    role: "Barba Specialist",
    photo: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    instagram: "@andrebarbas"
  },
  {
    id: 3,
    name: "Marcos Oliveira",
    role: "Style Expert",
    photo: "https://images.unsplash.com/photo-1612200487476-96dbb61978eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    instagram: "@marcosstyle"
  },
];

type Barber = typeof initialBarbers[0];

const ManageBarbers = () => {
  const [barbers, setBarbers] = useState<Barber[]>(initialBarbers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBarber, setNewBarber] = useState<Omit<Barber, 'id'>>({
    name: '',
    role: '',
    photo: '',
    instagram: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBarber(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBarber = () => {
    if (!newBarber.name || !newBarber.role) {
      toast({
        title: "Dados incompletos",
        description: "Nome e função são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const id = Math.max(0, ...barbers.map(b => b.id)) + 1;
    
    const barberToAdd: Barber = {
      id,
      ...newBarber,
      photo: newBarber.photo || "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
    };

    setBarbers(prev => [...prev, barberToAdd]);
    setNewBarber({
      name: '',
      role: '',
      photo: '',
      instagram: ''
    });
    setShowAddForm(false);
    
    toast({
      title: "Barbeiro adicionado",
      description: `${barberToAdd.name} foi adicionado com sucesso`
    });
  };

  const handleRemoveBarber = (id: number, name: string) => {
    setBarbers(prev => prev.filter(barber => barber.id !== id));
    toast({
      title: "Barbeiro removido",
      description: `${name} foi removido com sucesso`
    });
  };

  return (
    <div className="bg-barbershop-lightgray rounded-lg p-6 shadow-md border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gerenciar Barbeiros</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={showAddForm ? "bg-gray-700 hover:bg-gray-600" : "bg-barbershop-neonblue hover:bg-barbershop-neonblue/90"}
        >
          {showAddForm ? 'Cancelar' : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Barbeiro
            </>
          )}
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-barbershop-black p-4 rounded-lg border border-gray-700 mb-6">
          <h3 className="font-medium mb-4">Novo Barbeiro</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={newBarber.name}
                onChange={handleInputChange}
                className="bg-barbershop-lightgray border-gray-700 mt-1"
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="role">Função</Label>
              <Input
                id="role"
                name="role"
                value={newBarber.role}
                onChange={handleInputChange}
                className="bg-barbershop-lightgray border-gray-700 mt-1"
                placeholder="Ex: Master Barber"
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                name="instagram"
                value={newBarber.instagram}
                onChange={handleInputChange}
                className="bg-barbershop-lightgray border-gray-700 mt-1"
                placeholder="@usuario"
              />
            </div>
            <div>
              <Label htmlFor="photo">URL da Foto</Label>
              <Input
                id="photo"
                name="photo"
                value={newBarber.photo}
                onChange={handleInputChange}
                className="bg-barbershop-lightgray border-gray-700 mt-1"
                placeholder="https://exemplo.com/foto.jpg"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={handleAddBarber}
              className="bg-barbershop-neonblue hover:bg-barbershop-neonblue/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {barbers.map((barber) => (
          <div key={barber.id} className="bg-barbershop-black p-4 rounded-lg border border-gray-800 relative group">
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveBarber(barber.id, barber.name)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                <img 
                  src={barber.photo} 
                  alt={barber.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-medium">{barber.name}</h3>
                <p className="text-sm text-barbershop-neonblue">{barber.role}</p>
                <div className="flex items-center text-xs text-barbershop-textmuted mt-1">
                  <Instagram className="w-3 h-3 mr-1" />
                  <span>{barber.instagram}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBarbers;
