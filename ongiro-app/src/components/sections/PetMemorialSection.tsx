'use client';

import Link from 'next/link';

const pets = [
  {
    id: 'pet-1',
    name: '보리',
    type: '골든 리트리버',
    born: '2012.04.15',
    died: '2024.08.23',
    quote: '12년 동안 우리 가족의 햇살이었어. 영원히 사랑해.',
    by: '이가족',
    emoji: '🐕',
    color: '#C8A96E',
    photos: 284,
    memories: 43,
  },
  {
    id: 'pet-2',
    name: '나비',
    type: '코리안 숏헤어',
    born: '2015.09.02',
    died: '2023.12.30',
    quote: '늘 내 곁에서 그르렁거려주던 너, 보고 싶어.',
    by: '김가족',
    emoji: '🐈',
    color: '#8A9A7E',
    photos: 156,
    memories: 28,
  },
];

const petFeatures = [
  { icon: '📸', title: '무한 사진·영상 앨범', desc: '소중했던 순간들을 모두 간직하세요' },
  { icon: '📅', title: '기일 알림', desc: '반려동물의 기일에 자동으로 알림을 드립니다' },
  { icon: '🤖', title: 'AI 추억 영상', desc: '사진으로 생동감 있는 영상을 생성합니다' },
  { icon: '👨‍👩‍👧', title: '가족 공유 공간', desc: '가족 모두가 함께 추억을 나눌 수 있어요' },
  { icon: '🌿', title: '자연장 연계', desc: '자연장, 수목장과 연계된 디지털 추모지' },
  { icon: '💌', title: '추억 편지', desc: '하늘에 있는 아이에게 편지를 남겨보세요' },
];

export default function PetMemorialSection() {
  return (
    <section id="pets" className="mob-section" style={{ background: '#F9F5EF', padding: '120px 60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="mob-title-gap" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: '#8A9A7E',
            fontFamily: 'var(--font-noto-serif)',
            display: 'block',
            marginBottom: '16px',
          }}>
            PET MEMORIAL
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontFamily: 'var(--font-noto-serif)',
            color: 'var(--deep-brown)',
            fontWeight: 300,
            marginBottom: '20px',
            lineHeight: 1.3,
          }}>
            반려동물 추모 공간
          </h2>
          <p style={{ color: 'var(--soft-gray)', fontSize: '15px', lineHeight: '1.9', maxWidth: '540px', margin: '0 auto' }}>
            우리 가족이었던 반려동물과의 소중한 추억을<br />
            영원히 간직할 수 있는 특별한 공간입니다.
          </p>
        </div>

        <div className="mob-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          {/* Left: Pet cards */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(61,43,31,0.07)',
                    display: 'flex',
                  }}
                >
                  <div style={{
                    width: '100px',
                    background: `linear-gradient(135deg, ${pet.color}33, ${pet.color}11)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px',
                    flexShrink: 0,
                  }}>
                    {pet.emoji}
                  </div>
                  <div style={{ padding: '20px 24px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-noto-serif)',
                        fontSize: '18px',
                        fontWeight: 500,
                        color: 'var(--deep-brown)',
                      }}>{pet.name}</h3>
                      <span style={{
                        fontSize: '11px',
                        color: 'var(--soft-gray)',
                        background: 'rgba(61,43,31,0.06)',
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}>{pet.type}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--soft-gray)', marginBottom: '10px' }}>
                      {pet.born} — {pet.died}
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--mid-brown)',
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-noto-serif)',
                      lineHeight: '1.7',
                      marginBottom: '12px',
                    }}>
                      &ldquo;{pet.quote}&rdquo;
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--soft-gray)' }}>📷 {pet.photos}장</span>
                      <span style={{ fontSize: '12px', color: 'var(--soft-gray)' }}>💌 {pet.memories}개의 추억</span>
                    </div>
                    <Link
                      href={`/memorial/${pet.id}`}
                      style={{
                        fontSize: '12px',
                        color: pet.color,
                        textDecoration: 'none',
                        letterSpacing: '0.05em',
                        fontWeight: 500,
                      }}
                    >
                      추모 공간 방문하기 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div style={{
              background: 'var(--deep-brown)',
              borderRadius: '16px',
              padding: '28px 32px',
              color: 'var(--cream)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>🐾</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-noto-serif)', fontSize: '16px', fontWeight: 400 }}>
                    반려동물 추모 공간
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--gold-light)', opacity: 0.8 }}>Pet Memorial Plan</p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <span style={{ fontSize: '22px', fontFamily: 'var(--font-playfair)', color: 'var(--gold)' }}>₩6,900</span>
                  <span style={{ fontSize: '12px', color: 'var(--gold-light)', opacity: 0.7 }}>/월</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--gold-light)', opacity: 0.7, lineHeight: '1.7' }}>
                사랑하는 반려동물의 추억을 영원히 간직하세요. 사진, AI 추억 영상, 가족 공유까지 모두 포함됩니다.
              </p>
            </div>
          </div>

          {/* Right: Features grid */}
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '32px',
            }}>
              {petFeatures.map((f) => (
                <div
                  key={f.title}
                  style={{
                    background: 'white',
                    borderRadius: '14px',
                    padding: '24px',
                    boxShadow: '0 2px 16px rgba(61,43,31,0.06)',
                  }}
                >
                  <span style={{ fontSize: '28px', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
                  <h4 style={{
                    fontFamily: 'var(--font-noto-serif)',
                    fontSize: '14px',
                    color: 'var(--deep-brown)',
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}>
                    {f.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--soft-gray)', lineHeight: '1.7' }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px 32px',
              border: '1px dashed rgba(138,154,126,0.4)',
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-noto-serif)',
                fontSize: '15px',
                color: 'var(--deep-brown)',
                lineHeight: '1.8',
                marginBottom: '20px',
              }}>
                &ldquo;당신의 반려동물도<br />영원히 우리 곁에 있을 수 있습니다.&rdquo;
              </p>
              <button
                style={{
                  background: '#8A9A7E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 32px',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-noto-serif)',
                }}
              >
                반려동물 추모 공간 만들기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
