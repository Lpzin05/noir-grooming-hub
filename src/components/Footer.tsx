
import React from 'react';
import { Phone, Mail, MapPin, Clock, Scissors, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-barbershop-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-6 h-6 text-barbershop-neonblue" />
              <span className="text-xl font-bold">NOIR</span>
            </div>
            <p className="text-barbershop-textmuted mb-4">
              Um espaço premium onde a tradição encontra a modernidade para criar a melhor experiência de barbearia.
            </p>
            <div className="flex space-x-3">
              <SocialButton icon={Instagram} />
              <SocialButton icon={Facebook} />
              <SocialButton icon={Twitter} />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Serviços</h3>
            <ul className="space-y-2">
              {["Corte de Cabelo", "Barba Completa", "Sobrancelha", "Tratamento Facial", "Combo Cabelo + Barba"].map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-barbershop-textmuted hover:text-barbershop-neonblue transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-barbershop-textmuted">
              <li className="flex items-start">
                <Clock className="w-4 h-4 mr-2 mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-white">Segunda - Sexta</p>
                  <p>09:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 mr-2 mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-white">Sábado</p>
                  <p>09:00 - 17:00</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 mr-2 mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-white">Domingo</p>
                  <p>Fechado</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3 text-barbershop-textmuted">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista<br />São Paulo - SP, 01310-000</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 shrink-0" />
                <span>(11) 3456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 shrink-0" />
                <span>contato@noirbarbearia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-barbershop-textmuted text-sm">
            © 2023 Noir Barbearia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-barbershop-textmuted hover:text-barbershop-neonblue text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-barbershop-textmuted hover:text-barbershop-neonblue text-sm transition-colors">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialButtonProps {
  icon: React.FC<{ className?: string }>;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon: Icon }) => {
  return (
    <a
      href="#"
      className="w-8 h-8 rounded-full bg-barbershop-lightgray flex items-center justify-center
                hover:bg-barbershop-neonblue/20 hover:text-barbershop-neonblue transition-colors"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
};

export default Footer;
