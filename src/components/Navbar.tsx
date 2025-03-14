
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Scissors, UserCircle, LogOut } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  openAppointmentModal?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openAppointmentModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAppointmentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openAppointmentModal) {
      openAppointmentModal();
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-barbershop-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-barbershop-neonblue" />
            <span className="text-2xl font-bold">NOIR</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#services">Serviços</NavLink>
            <NavLink href="#barbers">Barbeiros</NavLink>
            <NavLink href="#testimonials">Depoimentos</NavLink>
            <NavLink href="#contact">Contato</NavLink>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-barbershop-text hover:text-barbershop-neonblue transition-colors">
                  <UserCircle size={18} />
                  <span>{user?.name || 'Barbeiro'}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-barbershop-lightgray border-gray-700 text-barbershop-text">
                  <DropdownMenuItem className="hover:bg-barbershop-black hover:text-barbershop-neonblue focus:bg-barbershop-black focus:text-barbershop-neonblue cursor-pointer">
                    <Link to="/barber-dashboard" className="flex items-center gap-2 w-full">
                      <UserCircle size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="hover:bg-barbershop-black hover:text-red-500 focus:bg-barbershop-black focus:text-red-500 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-barbershop-text hover:text-barbershop-neonblue transition-colors">
                <UserCircle size={18} />
                <span>Área do Barbeiro</span>
              </Link>
            )}
            <button className="neon-button" onClick={handleAppointmentClick}>
              Agendar Agora
            </button>
          </div>

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
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/barber-dashboard" 
                  className="text-barbershop-text hover:text-barbershop-neonblue transition-colors px-4 py-2 flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <UserCircle size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  className="text-red-500 hover:text-red-400 transition-colors px-4 py-2 flex items-center gap-2 text-left"
                  onClick={() => {
                    toggleMenu();
                    logout();
                  }}
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-barbershop-text hover:text-barbershop-neonblue transition-colors px-4 py-2 flex items-center gap-2"
                onClick={toggleMenu}
              >
                <UserCircle size={18} />
                <span>Área do Barbeiro</span>
              </Link>
            )}
            
            <button 
              className="neon-button w-full mt-2"
              onClick={(e) => {
                toggleMenu();
                handleAppointmentClick(e);
              }}
            >
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
