'use client';
import { useState } from 'react';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ui/ContactModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      <StatsBar />
      <FeaturesSection />
      <PricingSection onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
