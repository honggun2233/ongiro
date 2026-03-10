'use client';
import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      const size = 1 + Math.random() * 3;
      p.style.cssText = `
        position:absolute; border-radius:50%; background:#C8A96E;
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        animation: float-particle ${8 + Math.random() * 12}s ${Math.random() * 10}s linear infinite;
        opacity:0;
      `;
      container.appendChild(p);
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--deep-brown)' }}
    >
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100px) translateX(40px); opacity: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; } to { opacity: 1; }
        }
        .hero-anim-1 { opacity:0; animation: fade-up 0.8s 0.3s ease forwards; }
        .hero-anim-2 { opacity:0; animation: fade-up 0.8s 0.5s ease forwards; }
        .hero-anim-3 { opacity:0; animation: fade-up 0.8s 0.7s ease forwards; }
        .hero-anim-4 { opacity:0; animation: fade-up 0.8s 0.9s ease forwards; }
        .hero-anim-5 { opacity:0; animation: fade-up 0.8s 1.1s ease forwards; }
        .hero-anim-6 { opacity:0; animation: fade-in 1.2s 0.8s ease forwards; }
      `}</style>

      {/* BG gradient */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 20% 50%, rgba(107,76,59,0.6) 0%, transparent 60%),
                     radial-gradient(ellipse at 80% 20%, rgba(138,154,126,0.2) 0%, transparent 50%),
                     linear-gradient(180deg, #2A1F15 0%, #3D2B1F 50%, #4A3326 100%)`
      }} />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-16 max-w-6xl mx-auto w-full">
        <div className="hero-anim-1 text-xs tracking-widest uppercase flex items-center gap-4 mb-7" style={{ color: 'var(--gold)' }}>
          <span className="block w-10 h-px" style={{ background: 'var(--gold)' }} />
          디지털 추모 공원 · 생애사 아카이브
        </div>
        <h1 className="hero-anim-2 font-light leading-tight mb-3"
          style={{ fontFamily: 'var(--font-noto-serif)', fontSize: 'clamp(52px,7vw,96px)', color: 'var(--cream)' }}>
          기억은<br />영원히 <em className="not-italic" style={{ color: 'var(--gold-light)' }}>살아</em><br />숨쉽니다
        </h1>
        <p className="hero-anim-3 font-light italic mb-9" style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(18px,2.5vw,32px)',
          color: 'rgba(245,240,232,0.5)'
        }}>
          Where memories transcend time
        </p>
        <p className="hero-anim-4 text-sm leading-loose max-w-lg mb-14 font-light" style={{ color: 'rgba(245,240,232,0.7)' }}>
          소중한 분의 삶을 사진, 영상, AI 생성 콘텐츠로 아름답게 보존하세요.<br />
          온기로의 디지털 추모 공간에서 가족이 함께 기억하고, 세대를 넘어 연결됩니다.
        </p>
        <div className="hero-anim-5 flex gap-5 items-center">
          <button onClick={onOpenModal} className="px-10 py-4 text-sm font-medium tracking-wider cursor-pointer border-none rounded-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--gold)', color: 'var(--deep-brown)' }}>
            추모 공간 만들기
          </button>
          <a href="#memorial-preview" className="px-9 py-4 text-sm tracking-wider no-underline rounded-sm transition-all"
            style={{ border: '1px solid rgba(245,240,232,0.3)', color: 'var(--cream)' }}>
            미리보기
          </a>
        </div>
      </div>

      {/* Memorial card preview */}
      <div className="hero-anim-6 absolute right-0 top-1/2 -translate-y-1/2 w-[45%]">
        <div className="w-96 h-[480px] rounded-sm p-9 ml-auto mr-16 relative"
          style={{ background: 'linear-gradient(145deg,rgba(245,240,232,0.08),rgba(245,240,232,0.03))', border: '1px solid rgba(200,169,110,0.2)', backdropFilter: 'blur(4px)' }}>
          <div className="absolute top-3 left-3 right-3 bottom-3 rounded-sm pointer-events-none" style={{ border: '1px solid rgba(200,169,110,0.1)' }} />
          <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-sm tracking-wider" style={{ background: 'rgba(200,169,110,0.15)', color: 'var(--gold)' }}>Premium</div>
          <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg,var(--light-brown),var(--mid-brown))', fontFamily: 'var(--font-noto-serif)', color: 'var(--cream)' }}>
            홍
          </div>
          <div className="text-center text-xl mb-1.5" style={{ fontFamily: 'var(--font-noto-serif)', color: 'var(--cream)' }}>홍길동 님</div>
          <div className="text-center text-xs tracking-widest mb-6" style={{ color: 'rgba(200,169,110,0.8)' }}>1940. 03. 15 — 2024. 11. 08</div>
          <div className="w-10 h-px mx-auto mb-6 opacity-50" style={{ background: 'var(--gold)' }} />
          <p className="text-center text-sm font-light italic leading-relaxed" style={{ fontFamily: 'var(--font-noto-serif)', color: 'rgba(245,240,232,0.6)' }}>
            &quot;가족을 사랑하고<br />나라를 사랑한 분&quot;
          </p>
          <div className="flex gap-2 mt-6">
            {['📷', '🎬', '🤖', '📖'].map((icon, i) => (
              <div key={i} className="flex-1 h-14 flex items-center justify-center text-lg rounded-sm"
                style={{ background: 'rgba(255,255,255,0.05)' }}>{icon}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer border-none bg-transparent"
        style={{ color: 'rgba(245,240,232,0.4)' }}
      >
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, transparent, rgba(200,169,110,0.6))' }} />
        <span className="text-xs tracking-widest">SCROLL</span>
      </button>
    </section>
  );
}
