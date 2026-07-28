'use client';
import { useState } from 'react';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import EmotionalBridgeSection from '@/components/sections/EmotionalBridgeSection';
import MemorialPreviewSection from '@/components/sections/MemorialPreviewSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import AIFeaturesSection from '@/components/sections/AIFeaturesSection';
import PetMemorialSection from '@/components/sections/PetMemorialSection';
import PricingSection from '@/components/sections/PricingSection';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ui/ContactModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* 1. 감성 훅 */}
      <HeroSection onOpenModal={() => setModalOpen(true)} />

      {/* 2. 공감 브릿지 — 히어로의 감성을 이어받아 사용자와 연결 */}
      <EmotionalBridgeSection />

      {/* 3. 실제 추모 공간 — 사람과 반려동물 모두 */}
      <MemorialPreviewSection />

      {/* 4. 반려동물 — 추모 공간 바로 아래, 자연스러운 확장 */}
      <PetMemorialSection />

      {/* 5. AI 기능 */}
      <AIFeaturesSection />

      {/* 6. 시작 방법 — 요금제 바로 위, 결심 직전 안내 */}
      <HowItWorksSection />

      {/* 7. 요금제 — 결심한 사용자에게 선택지 제시 */}
      <PricingSection onOpenModal={() => setModalOpen(true)} />

      <Footer />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
