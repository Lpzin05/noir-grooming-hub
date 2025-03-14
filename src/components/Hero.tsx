
import React from 'react';
import { Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-barbershop-black to-barbershop-darkgray z-0"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Estilo & Precisão <br />
              <span className="neon-text">Para Homens Modernos</span>
            </h1>
            <p className="text-barbershop-textmuted text-lg md:text-xl max-w-lg">
              Um espaço premium onde a tradição encontra a modernidade para criar a melhor experiência de barbearia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="neon-button flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Agendar Agora
              </button>
              <button className="px-4 py-2 border border-barbershop-neonblue text-barbershop-neonblue rounded-md 
                                hover:bg-barbershop-neonblue/10 transition-colors">
                Ver Serviços
              </button>
            </div>
          </div>
          <div className="relative hidden md:block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-full h-[500px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-barbershop-black to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Barber Shop" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats */}
            <div className="absolute bottom-4 right-4 left-4 z-20">
              <div className="grid grid-cols-3 gap-2 bg-barbershop-darkgray/80 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                {[
                  { value: "5000+", label: "Clientes" },
                  { value: "4.9", label: "Avaliação" },
                  { value: "10+", label: "Anos" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-barbershop-neonblue">{stat.value}</div>
                    <div className="text-sm text-barbershop-textmuted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
