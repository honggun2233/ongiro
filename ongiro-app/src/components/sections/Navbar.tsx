'use client';
import { useEffect, useState } from 'react';

interface NavbarProps {
  onOpenModal: () => void;
}

const navLinks = [
  { label: '서비스', href: '#how-it-works' },
  { label: '추모 공간', href: '#memorial-preview' },
  { label: 'AI 기능', href: '#ai-features' },
  { label: '반려동물', href: '#pets' },
  { label: '요금제', href: '#pricing' },
];

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? 'rgba(250,247,242,0.97)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 30px rgba(61,43,31,0.08)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: scrolled ? '14px 60px' : '22px 60px' }}
        >
          {/* 로고 */}
          <a href="#" className="flex items-center gap-2 no-underline" onClick={handleLinkClick}>
            <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '22px', color: 'var(--deep-brown)' }}>
              Ongiro
            </span>
            <span className="text-xs font-light tracking-widest" style={{ fontFamily: 'var(--font-noto-serif)', color: 'var(--light-brown)' }}>
              온기로
            </span>
          </a>

          {/* 데스크톱 메뉴 */}
          <ul className="nav-desktop flex gap-8 list-none items-center">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-xs tracking-wider no-underline transition-colors duration-200"
                  style={{ color: 'var(--mid-brown)' }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onOpenModal}
                className="text-xs tracking-wider px-5 py-2.5 border-none cursor-pointer rounded-sm"
                style={{ background: 'var(--deep-brown)', color: 'var(--cream)' }}
              >
                추모 공간 분양받기
              </button>
            </li>
          </ul>

          {/* 햄버거 버튼 (모바일) */}
          <button
            className="nav-hamburger flex-col gap-1.5 cursor-pointer border-none bg-transparent p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <span
              className="block transition-all duration-300"
              style={{
                width: '22px', height: '1.5px',
                background: 'var(--deep-brown)',
                transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: '22px', height: '1.5px',
                background: 'var(--deep-brown)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: '22px', height: '1.5px',
                background: 'var(--deep-brown)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        <div
          className="nav-mobile-menu"
          style={{
            display: menuOpen ? 'block' : 'none',
            borderTop: '1px solid rgba(61,43,31,0.08)',
            padding: '16px 20px 24px',
          }}
        >
          <ul className="list-none flex flex-col gap-0">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleLinkClick}
                  className="block py-3 text-sm tracking-wider no-underline border-b"
                  style={{
                    color: 'var(--mid-brown)',
                    borderColor: 'rgba(61,43,31,0.06)',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <button
                onClick={() => { onOpenModal(); handleLinkClick(); }}
                className="w-full py-3 text-sm tracking-wider border-none cursor-pointer rounded-sm"
                style={{ background: 'var(--deep-brown)', color: 'var(--cream)' }}
              >
                추모 공간 분양받기
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* 모바일 패딩 보정용 — 고정 nav 높이만큼 */}
      <style>{`
        @media (max-width: 768px) {
          nav .flex.items-center.justify-between {
            padding: 16px 20px !important;
          }
        }
      `}</style>
    </>
  );
}
