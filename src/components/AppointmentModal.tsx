
import React, { useState } from 'react';
import { Calendar, Clock, X, Scissors, User, Phone, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

// Time slots for the appointment
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

// Services offered by the barbershop
const services = [
  { id: 1, name: "Corte de Cabelo", price: "R$ 50", duration: "30 min", icon: Scissors },
  { id: 2, name: "Barba Completa", price: "R$ 40", duration: "25 min" },
  { id: 3, name: "Sobrancelha", price: "R$ 20", duration: "15 min" },
  { id: 4, name: "Combo Cabelo + Barba", price: "R$ 80", duration: "50 min" },
  { id: 5, name: "Tratamento Facial", price: "R$ 70", duration: "40 min" }
];

// Barbers available for appointments
const barbers = [
  { id: 1, name: "Carlos Silva" },
  { id: 2, name: "André Martins" },
  { id: 3, name: "Marcos Oliveira" }
];

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ open, onOpenChange }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
  };

  const handleBarberSelect = (barberId: number) => {
    setSelectedBarber(barberId);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleBooking = () => {
    // In a real application, you would send this data to your backend
    toast({
      title: "Agendamento Confirmado!",
      description: `Seu agendamento foi confirmado para ${date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : ''} às ${selectedTimeSlot}.`,
    });
    
    // Reset form and close modal
    setStep(1);
    setSelectedTimeSlot(null);
    setSelectedService(null);
    setSelectedBarber(null);
    setFormData({ name: '', phone: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-barbershop-darkgray text-white border-gray-800 max-w-md sm:max-w-lg md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Agendar Horário</DialogTitle>
          <DialogDescription className="text-barbershop-textmuted">
            Preencha os detalhes abaixo para agendar seu horário na nossa barbearia.
          </DialogDescription>
        </DialogHeader>
        
        {/* Step indicators */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div 
              key={stepNumber} 
              className={cn(
                "w-3 h-3 rounded-full mx-1",
                step === stepNumber 
                  ? "bg-barbershop-neonblue" 
                  : step > stepNumber 
                    ? "bg-green-500" 
                    : "bg-gray-600"
              )}
            />
          ))}
        </div>

        {/* Step 1: Select date and time */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <Label htmlFor="date">Selecione a Data</Label>
                <div className="mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-barbershop-lightgray border-gray-700",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP', { locale: ptBR }) : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-barbershop-lightgray border-gray-700 pointer-events-auto">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <Label>Selecione o Horário</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={cn(
                        "flex items-center justify-center py-2 px-3 text-sm rounded border",
                        selectedTimeSlot === time
                          ? "bg-barbershop-neonblue text-white border-transparent"
                          : "bg-barbershop-lightgray text-white border-gray-700 hover:border-barbershop-neonblue"
                      )}
                      onClick={() => handleTimeSlotSelect(time)}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                className="bg-barbershop-neonblue hover:bg-barbershop-neonblue/90 w-full sm:w-auto"
                onClick={nextStep}
                disabled={!date || !selectedTimeSlot}
              >
                Próximo
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Step 2: Select service and barber */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label>Selecione o Serviço</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded border",
                      selectedService === service.id
                        ? "bg-barbershop-neonblue text-white border-transparent"
                        : "bg-barbershop-lightgray text-white border-gray-700 hover:border-barbershop-neonblue"
                    )}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="flex items-center">
                      <Scissors className="w-4 h-4 mr-2" />
                      <span>{service.name}</span>
                    </div>
                    <div className="text-sm opacity-80">{service.price}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Selecione o Barbeiro</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                {barbers.map((barber) => (
                  <button
                    key={barber.id}
                    type="button"
                    className={cn(
                      "flex items-center justify-center px-3 py-2 rounded border",
                      selectedBarber === barber.id
                        ? "bg-barbershop-neonblue text-white border-transparent"
                        : "bg-barbershop-lightgray text-white border-gray-700 hover:border-barbershop-neonblue"
                    )}
                    onClick={() => handleBarberSelect(barber.id)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span>{barber.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              <Button 
                variant="outline" 
                className="mt-2 sm:mt-0 border-gray-700 text-white hover:bg-barbershop-lightgray"
                onClick={prevStep}
              >
                Voltar
              </Button>
              <Button 
                className="bg-barbershop-neonblue hover:bg-barbershop-neonblue/90"
                onClick={nextStep}
                disabled={!selectedService || !selectedBarber}
              >
                Próximo
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Step 3: Enter personal details */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="bg-barbershop-lightgray border-gray-700 mt-1" 
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className="bg-barbershop-lightgray border-gray-700 mt-1" 
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
            
            <div className="bg-barbershop-lightgray border border-gray-700 rounded-md p-4">
              <h4 className="font-semibold mb-2">Resumo do Agendamento</h4>
              <ul className="space-y-2 text-sm text-barbershop-textmuted">
                <li className="flex justify-between">
                  <span>Data:</span>
                  <span className="text-white">{date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : ''}</span>
                </li>
                <li className="flex justify-between">
                  <span>Horário:</span>
                  <span className="text-white">{selectedTimeSlot}</span>
                </li>
                <li className="flex justify-between">
                  <span>Serviço:</span>
                  <span className="text-white">
                    {services.find(s => s.id === selectedService)?.name || ''}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Barbeiro:</span>
                  <span className="text-white">
                    {barbers.find(b => b.id === selectedBarber)?.name || ''}
                  </span>
                </li>
              </ul>
            </div>
            
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              <Button 
                variant="outline" 
                className="mt-2 sm:mt-0 border-gray-700 text-white hover:bg-barbershop-lightgray"
                onClick={prevStep}
              >
                Voltar
              </Button>
              <Button 
                className="bg-barbershop-neonblue hover:bg-barbershop-neonblue/90"
                onClick={handleBooking}
                disabled={!formData.name || !formData.phone}
              >
                Confirmar Agendamento
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
