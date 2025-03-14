
import React from 'react';
import { Scissors, Ruler, Brush, Droplet } from 'lucide-react';
import { cn } from "@/lib/utils";

const services = [
  {
    id: 1,
    title: "Corte de Cabelo",
    description: "Cortes modernos e clássicos para todos os estilos e tipos de cabelo.",
    price: "R$ 50",
    duration: "30 min",
    icon: Scissors
  },
  {
    id: 2,
    title: "Barba Completa",
    description: "Modelagem, hidratação e acabamento perfeito para sua barba.",
    price: "R$ 40",
    duration: "25 min",
    icon: Ruler
  },
  {
    id: 3,
    title: "Sobrancelha",
    description: "Limpeza e design para realçar o seu olhar masculino.",
    price: "R$ 20",
    duration: "15 min",
    icon: Brush
  },
  {
    id: 4,
    title: "Tratamento Facial",
    description: "Limpeza de pele, hidratação e tratamento para pele masculina.",
    price: "R$ 70",
    duration: "40 min",
    icon: Droplet
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-barbershop-darkgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block mx-auto">Nossos Serviços</h2>
          <p className="text-barbershop-textmuted mt-4 max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços para cuidar do seu visual, desde cortes de cabelo até tratamentos faciais especializados para homens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="neon-button">Ver Todos os Serviços</button>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <div 
      className={cn(
        "card flex flex-col h-full group animate-fade-in",
        "hover:border-barbershop-neonblue/50"
      )}
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <div className="p-3 rounded-full bg-barbershop-black w-12 h-12 flex items-center justify-center mb-4
                    group-hover:bg-barbershop-neonblue/10 transition-colors">
        <service.icon className="w-6 h-6 text-barbershop-neonblue" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-barbershop-textmuted mb-4 flex-grow">{service.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="font-bold text-xl text-barbershop-neonblue">{service.price}</span>
        <span className="text-sm text-barbershop-textmuted">{service.duration}</span>
      </div>
      <button className="mt-4 w-full py-2 border border-barbershop-neonblue text-barbershop-neonblue rounded
                       hover:bg-barbershop-neonblue/10 transition-colors">
        Agendar
      </button>
    </div>
  );
};

export default Services;
