
import React from 'react';
import { Star, Instagram, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";

const barbers = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Master Barber",
    photo: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    rating: 4.9,
    description: "Especialista em degradês e estilos modernos, com mais de 10 anos de experiência.",
    instagram: "@carlosbarber"
  },
  {
    id: 2,
    name: "André Martins",
    role: "Barba Specialist",
    photo: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.8,
    description: "Mestre em designs de barba e tratamentos faciais para homens.",
    instagram: "@andrebarbas"
  },
  {
    id: 3,
    name: "Marcos Oliveira",
    role: "Style Expert",
    photo: "https://images.unsplash.com/photo-1612200487476-96dbb61978eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.7,
    description: "Criativo e atualizado com as últimas tendências em cortes masculinos.",
    instagram: "@marcosstyle"
  },
];

const BarberProfiles: React.FC = () => {
  return (
    <section id="barbers" className="py-24 bg-barbershop-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block mx-auto">Conheça Nossos Barbeiros</h2>
          <p className="text-barbershop-textmuted mt-4 max-w-2xl mx-auto">
            Nossa equipe de profissionais altamente qualificados está pronta para transformar seu visual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <BarberCard 
              key={barber.id} 
              barber={barber}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface BarberCardProps {
  barber: typeof barbers[0];
  index: number;
}

const BarberCard: React.FC<BarberCardProps> = ({ barber, index }) => {
  return (
    <div 
      className={cn(
        "card relative group overflow-hidden animate-fade-in",
        "hover:border-barbershop-neonblue/50"
      )}
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <div className="relative h-72 mb-4 overflow-hidden rounded-md">
        <img 
          src={barber.photo} 
          alt={barber.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-barbershop-black to-transparent">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-white font-medium">{barber.rating}</span>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold">{barber.name}</h3>
      <p className="text-barbershop-neonblue mb-2">{barber.role}</p>
      <p className="text-barbershop-textmuted mb-4">{barber.description}</p>
      
      <div className="flex items-center text-barbershop-textmuted mb-4">
        <Instagram className="w-4 h-4 mr-2" />
        <span>{barber.instagram}</span>
      </div>

      <button className="w-full py-2 bg-barbershop-neonblue text-white rounded flex items-center justify-center gap-2
                       hover:bg-opacity-90 transition-colors">
        <Calendar className="w-4 h-4" />
        Agendar Horário
      </button>
    </div>
  );
};

export default BarberProfiles;
