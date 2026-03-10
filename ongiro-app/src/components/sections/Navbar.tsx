'use client';
import { useEffect, useState } from 'react';

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
      style={{
        padding: scrolled ? '16px 60px' : '24px 60px',
        background: scrolled ? 'rgba(250,247,242,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 30px rgba(61,43,31,0.08)' : 'none',
      }}
    >
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <span className="text-2xl" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--deep-brown)' }}>
          Ongiro
        </span>
        <span className="text-sm font-light tracking-widest" style={{ fontFamily: 'var(--font-noto-serif)', color: 'var(--light-brown)' }}>
          온기로
        </span>
      </a>
      <ul className="flex gap-9 list-none">
        {[
          { label: '서비스', href: '#features' },
          { label: '추모 공간', href: '#memorial-preview' },
          { label: 'AI 기능', href: '#ai-features' },
          { label: '요금제', href: '#pricing' },
        ].map(({ label, href }) => (
          <li key={href}>
            <a href={href} className="text-xs tracking-wider no-underline transition-colors duration-200" style={{ color: 'var(--mid-brown)' }}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={onOpenModal}
            className="text-xs tracking-wider px-6 py-2.5 border-none cursor-pointer rounded-sm"
            style={{ background: 'var(--deep-brown)', color: 'var(--cream)' }}
          >
            추모 공간 분양받기
          </button>
        </li>
      </ul>
    </nav>
  );
}
