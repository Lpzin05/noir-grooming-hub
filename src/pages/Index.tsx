
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

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-barbershop-black text-white">
      <Navbar openAppointmentModal={openAppointmentModal} />
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
