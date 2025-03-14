
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BarberProfiles from '@/components/BarberProfiles';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/AppointmentModal';

const Index = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Detect clicks on "Agendar" buttons and open the modal
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the clicked element or its parent has the text "Agendar"
      const hasAgendarText = (element: HTMLElement): boolean => {
        const text = element.textContent?.toLowerCase() || '';
        return text.includes('agendar');
      };
      
      // Check the target and its parent elements
      let currentElement: HTMLElement | null = target;
      while (currentElement) {
        if (currentElement.tagName === 'BUTTON' && hasAgendarText(currentElement)) {
          setIsAppointmentModalOpen(true);
          break;
        }
        currentElement = currentElement.parentElement;
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-barbershop-black text-white">
      <Navbar />
      <Hero />
      <Services />
      <BarberProfiles />
      <Testimonials />
      <Footer />
      
      <AppointmentModal 
        open={isAppointmentModalOpen} 
        onOpenChange={setIsAppointmentModalOpen} 
      />
    </div>
  );
};

export default Index;
