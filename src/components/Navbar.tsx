
import React, { useState } from 'react';
import { Menu, X, Scissors } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-barbershop-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-barbershop-neonblue" />
            <span className="text-2xl font-bold">NOIR</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#services">Serviços</NavLink>
            <NavLink href="#barbers">Barbeiros</NavLink>
            <NavLink href="#testimonials">Depoimentos</NavLink>
            <NavLink href="#contact">Contato</NavLink>
          </div>
          
          <button className="hidden md:block neon-button">
            Agendar Agora
          </button>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
        )}>
          <div className="flex flex-col space-y-4 py-4">
            <MobileNavLink href="#services" onClick={toggleMenu}>Serviços</MobileNavLink>
            <MobileNavLink href="#barbers" onClick={toggleMenu}>Barbeiros</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={toggleMenu}>Depoimentos</MobileNavLink>
            <MobileNavLink href="#contact" onClick={toggleMenu}>Contato</MobileNavLink>
            <button className="neon-button w-full mt-2">
              Agendar Agora
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="text-barbershop-text hover:text-barbershop-neonblue transition-colors relative group"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-barbershop-neonblue transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => {
  return (
    <a 
      href={href} 
      className="text-barbershop-text hover:text-barbershop-neonblue transition-colors px-4 py-2 block w-full"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Navbar;
