'use client';

import Link from 'next/link';

const memorials = [
  {
    id: 'demo-1',
    name: '김정수',
    born: '1945.06.12',
    died: '2024.03.08',
    quote: '가족을 위해 평생을 바치신 아버지, 당신의 사랑은 영원합니다.',
    by: '가족 일동',
    initial: '김',
    accentColor: '#C8A96E',
    visitors: 128,
    photos: 342,
    candles: 89,
  },
  {
    id: 'demo-2',
    name: '박순희',
    born: '1948.02.20',
    died: '2023.11.15',
    quote: '따뜻한 미소와 손길로 우리를 보듬어 주셨던 어머니.',
    by: '자녀 일동',
    initial: '박',
    accentColor: '#C4977A',
    visitors: 94,
    photos: 218,
    candles: 63,
  },
  {
    id: 'demo-3',
    name: '이태영',
    born: '1962.09.05',
    died: '2022.07.22',
    quote: '언제나 우리의 든든한 버팀목이 되어주셨습니다.',
    by: '가족 일동',
    initial: '이',
    accentColor: '#8A9A7E',
    visitors: 67,
    photos: 156,
    candles: 41,
  },
];

export default function MemorialPreviewSection() {
  return (
    <section id="memorial-preview" className="mob-section" style={{ background: 'var(--warm-white)', padding: '120px 60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="mob-title-gap" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: 'var(--gold)',
            fontFamily: 'var(--font-noto-serif)',
            display: 'block',
            marginBottom: '16px',
          }}>
            MEMORIAL SPACE
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontFamily: 'var(--font-noto-serif)',
            color: 'var(--deep-brown)',
            fontWeight: 300,
            marginBottom: '20px',
            lineHeight: 1.3,
          }}>
            소중한 분들의 추모 공간
          </h2>
          <p style={{ color: 'var(--soft-gray)', fontSize: '15px', lineHeight: '1.9', maxWidth: '520px', margin: '0 auto' }}>
            온기로에 마련된 추모 공간을 방문해보세요.<br />
            사진, 영상, 이야기로 그분의 삶이 살아 숨쉽니다.
          </p>
        </div>

        <div className="mob-grid-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '56px',
        }}>
          {memorials.map((m) => (
            <div
              key={m.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 32px rgba(61,43,31,0.08)',
              }}
            >
              <div className="mob-card-header" style={{
                background: 'var(--deep-brown)',
                padding: '44px 32px 36px',
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
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${m.accentColor}, ${m.accentColor}88)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  fontSize: '30px',
                  color: 'white',
                  fontFamily: 'var(--font-noto-serif)',
                  border: '3px solid rgba(255,255,255,0.15)',
                  position: 'relative',
                }}>
                  {m.initial}
                </div>
                <h3 style={{
                  color: 'var(--cream)',
                  fontFamily: 'var(--font-noto-serif)',
                  fontSize: '22px',
                  fontWeight: 400,
                  marginBottom: '10px',
                  position: 'relative',
                }}>
                  {m.name}
                </h3>
                <p style={{
                  color: 'var(--gold-light)',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  position: 'relative',
                }}>
                  {m.born} — {m.died}
                </p>
              </div>

              <div className="mob-card" style={{ padding: '28px 32px 32px' }}>
                <p style={{
                  color: 'var(--mid-brown)',
                  fontSize: '14px',
                  lineHeight: '1.9',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-noto-serif)',
                  marginBottom: '6px',
                }}>
                  &ldquo;{m.quote}&rdquo;
                </p>
                <p style={{ color: 'var(--soft-gray)', fontSize: '12px', marginBottom: '24px' }}>
                  — {m.by}
                </p>

                <div style={{
                  display: 'flex',
                  borderTop: '1px solid rgba(61,43,31,0.07)',
                  borderBottom: '1px solid rgba(61,43,31,0.07)',
                  padding: '16px 0',
                  marginBottom: '22px',
                }}>
                  {[
                    { icon: '👁', value: `${m.visitors}명`, label: '방문자' },
                    { icon: '📷', value: `${m.photos}장`, label: '사진' },
                    { icon: '🕯', value: `${m.candles}개`, label: '추모' },
                  ].map(({ icon, value, label }) => (
                    <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '15px', marginBottom: '4px' }}>{icon}</div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--deep-brown)' }}>{value}</div>
                      <div style={{ fontSize: '11px', color: 'var(--soft-gray)', marginTop: '2px' }}>{label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/memorial/${m.id}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '13px',
                    border: '1px solid var(--light-brown)',
                    borderRadius: '8px',
                    color: 'var(--deep-brown)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-noto-serif)',
                    transition: 'all 0.2s',
                  }}
                >
                  추모 공간 방문하기 →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/memorials"
            style={{
              display: 'inline-block',
              padding: '14px 44px',
              border: '1px solid var(--deep-brown)',
              borderRadius: '4px',
              color: 'var(--deep-brown)',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-noto-serif)',
            }}
          >
            모든 추모 공간 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
