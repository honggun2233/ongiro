'use client';

import Link from 'next/link';
import { useState } from 'react';

const allMemorials = [
  {
    id: 'demo-1',
    name: '김정수',
    born: '1945',
    died: '2024',
    quote: '가족을 위해 평생을 바치신 아버지',
    initial: '김',
    accentColor: '#C8A96E',
    visitors: 128,
    photos: 342,
    candles: 89,
    type: 'human' as const,
  },
  {
    id: 'demo-2',
    name: '박순희',
    born: '1948',
    died: '2023',
    quote: '따뜻한 미소와 손길로 우리를 보듬어 주셨던 어머니',
    initial: '박',
    accentColor: '#C4977A',
    visitors: 94,
    photos: 218,
    candles: 63,
    type: 'human' as const,
  },
  {
    id: 'demo-3',
    name: '이태영',
    born: '1962',
    died: '2022',
    quote: '언제나 우리의 든든한 버팀목',
    initial: '이',
    accentColor: '#8A9A7E',
    visitors: 67,
    photos: 156,
    candles: 41,
    type: 'human' as const,
  },
  {
    id: 'pet-1',
    name: '보리',
    born: '2012',
    died: '2024',
    quote: '12년간 우리 가족의 햇살이었던 골든 리트리버',
    initial: '🐕',
    accentColor: '#C8A96E',
    visitors: 52,
    photos: 284,
    candles: 38,
    type: 'pet' as const,
  },
  {
    id: 'pet-2',
    name: '나비',
    born: '2015',
    died: '2023',
    quote: '늘 내 곁에서 그르렁거려주던 코리안 숏헤어',
    initial: '🐈',
    accentColor: '#8A9A7E',
    visitors: 34,
    photos: 156,
    candles: 27,
    type: 'pet' as const,
  },
];

export default function MemorialsPage() {
  const [filter, setFilter] = useState<'all' | 'human' | 'pet'>('all');

  const filtered = filter === 'all' ? allMemorials : allMemorials.filter(m => m.type === filter);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--warm-white)' }}>
      {/* Header */}
      <div style={{ background: 'var(--deep-brown)', padding: '80px 60px 64px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              display: 'block',
              color: 'var(--gold-light)',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '0.1em',
              marginBottom: '48px',
              opacity: 0.7,
            }}
          >
            ← 홈으로
          </Link>
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: 'var(--gold)',
            fontFamily: 'var(--font-noto-serif)',
            display: 'block',
            marginBottom: '16px',
          }}>
            MEMORIAL SPACES
          </span>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontFamily: 'var(--font-noto-serif)',
            color: 'var(--cream)',
            fontWeight: 300,
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            추모 공간 목록
          </h1>
          <p style={{ color: 'var(--gold-light)', fontSize: '15px', opacity: 0.7 }}>
            소중한 분들의 이야기가 영원히 살아있는 곳
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 60px' }}>
        {/* Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          {[
            { key: 'all', label: '전체' },
            { key: 'human', label: '인물' },
            { key: 'pet', label: '반려동물 🐾' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              style={{
                padding: '8px 20px',
                border: filter === key ? 'none' : '1px solid rgba(61,43,31,0.15)',
                borderRadius: '20px',
                background: filter === key ? 'var(--deep-brown)' : 'white',
                color: filter === key ? 'var(--cream)' : 'var(--mid-brown)',
                fontSize: '13px',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--soft-gray)', alignSelf: 'center' }}>
            {filtered.length}개의 추모 공간
          </span>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '28px',
        }}>
          {filtered.map((m) => (
            <div
              key={m.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(61,43,31,0.07)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{
                background: 'var(--deep-brown)',
                padding: '36px 28px',
                textAlign: 'center',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 50% 0%, ${m.accentColor}22 0%, transparent 70%)`,
                }} />
                {m.type === 'pet' && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    color: 'var(--gold-light)',
                    letterSpacing: '0.05em',
                  }}>
                    반려동물
                  </span>
                )}
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${m.accentColor}, ${m.accentColor}88)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: m.type === 'pet' ? '30px' : '26px',
                  color: 'white',
                  fontFamily: 'var(--font-noto-serif)',
                  border: '3px solid rgba(255,255,255,0.12)',
                  position: 'relative',
                }}>
                  {m.initial}
                </div>
                <h3 style={{
                  color: 'var(--cream)',
                  fontFamily: 'var(--font-noto-serif)',
                  fontSize: '20px',
                  fontWeight: 400,
                  marginBottom: '8px',
                  position: 'relative',
                }}>
                  {m.name}
                </h3>
                <p style={{
                  color: 'var(--gold-light)',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  opacity: 0.8,
                  position: 'relative',
                }}>
                  {m.born} — {m.died}
                </p>
              </div>

              <div style={{ padding: '24px 28px 28px' }}>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--mid-brown)',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-noto-serif)',
                  marginBottom: '20px',
                }}>
                  {m.quote}
                </p>

                <div style={{
                  display: 'flex',
                  borderTop: '1px solid rgba(61,43,31,0.07)',
                  borderBottom: '1px solid rgba(61,43,31,0.07)',
                  padding: '14px 0',
                  marginBottom: '20px',
                }}>
                  {[
                    { icon: '👁', value: `${m.visitors}명`, label: '방문' },
                    { icon: '📷', value: `${m.photos}장`, label: '사진' },
                    { icon: '🕯', value: `${m.candles}개`, label: '추모' },
                  ].map(({ icon, value, label }) => (
                    <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', marginBottom: '3px' }}>{icon}</div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--deep-brown)' }}>{value}</div>
                      <div style={{ fontSize: '11px', color: 'var(--soft-gray)', marginTop: '2px' }}>{label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/memorial/${m.id}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    background: 'var(--deep-brown)',
                    borderRadius: '8px',
                    color: 'var(--cream)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-noto-serif)',
                  }}
                >
                  추모 공간 방문하기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
