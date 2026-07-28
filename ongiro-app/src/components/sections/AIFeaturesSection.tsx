'use client';

import { useState } from 'react';

const features = [
  {
    tag: 'AI VOICE',
    icon: '🎙',
    title: 'AI 음성 복원',
    desc: '생전 목소리 녹음을 기반으로 고인의 음성을 AI로 복원합니다. 가족에게 남기는 메시지, 좋아하시던 시 낭독, 손자녀에게 전하는 이야기를 음성으로 만들어드립니다.',
    tags: ['음성 합성', '감정 표현', '다국어 지원'],
    demo: {
      type: 'voice',
      content: (
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '13px', color: '#8A8A8A', marginBottom: '8px' }}>복원된 음성 샘플</p>
            <div style={{
              background: 'rgba(61,43,31,0.05)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}>
                ▶
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  height: '4px',
                  background: 'rgba(61,43,31,0.1)',
                  borderRadius: '2px',
                  position: 'relative',
                }}>
                  <div style={{
                    width: '35%',
                    height: '100%',
                    background: 'var(--gold)',
                    borderRadius: '2px',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#8A8A8A' }}>0:42</span>
                  <span style={{ fontSize: '11px', color: '#8A8A8A' }}>2:00</span>
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#6B4C3B', fontStyle: 'italic', fontFamily: 'var(--font-noto-serif)', lineHeight: '1.8' }}>
            &ldquo;내 손자야, 할아버지는 언제나 네 곁에 있단다...&rdquo;
          </p>
        </div>
      ),
    },
  },
  {
    tag: 'AI VIDEO',
    icon: '🎥',
    title: 'AI 영상 생성',
    desc: '사진 한 장으로 고인이 살아계실 때의 자연스러운 표정과 움직임을 담은 AI 영상을 생성합니다. 소중한 사람의 생동감 있는 모습을 영원히 간직하세요.',
    tags: ['사진 → 영상', '자연스러운 표정', '4K 품질'],
    demo: {
      type: 'video',
      content: (
        <div style={{ padding: '24px' }}>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '12px',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #3D2B1F44 0%, #C8A96E22 100%)',
            }} />
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(200,169,110,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              cursor: 'pointer',
              position: 'relative',
            }}>
              ▶
            </div>
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '11px',
              color: 'white',
            }}>
              AI 생성 영상 미리보기
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#8A8A8A', textAlign: 'center' }}>
            사진 1장 → 30초 자연스러운 영상 생성
          </p>
        </div>
      ),
    },
  },
  {
    tag: 'AI CHAT',
    icon: '💬',
    title: 'AI 페르소나 대화',
    desc: '고인의 생전 기록, 편지, 일기를 학습한 AI와 대화하세요. 마치 옆에 계신 것처럼 따뜻한 대화를 나눌 수 있습니다. 미래 세대도 조상의 이야기를 직접 들을 수 있습니다.',
    tags: ['맞춤형 AI', '감성 대화', '24시간 이용'],
    demo: {
      type: 'chat',
      content: (
        <div style={{ padding: '16px 20px' }}>
          {[
            { from: 'user', text: '아버지, 요즘 많이 보고 싶어요.' },
            { from: 'ai', text: '나도 그렇단다. 밥은 잘 먹고 있니? 건강이 제일이야.' },
            { from: 'user', text: '네, 잘 먹고 있어요. 아버지 좋아하시던 된장찌개 끓였어요.' },
            { from: 'ai', text: '잘했네. 어머니 레시피 그대로 했구나? 아버지도 배가 고프겠다.' },
          ].map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <div style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.from === 'user' ? 'var(--deep-brown)' : 'rgba(61,43,31,0.07)',
                color: msg.from === 'user' ? 'var(--cream)' : 'var(--deep-brown)',
                fontSize: '13px',
                lineHeight: '1.6',
                fontFamily: 'var(--font-noto-sans)',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
            padding: '10px 12px',
            background: 'rgba(61,43,31,0.05)',
            borderRadius: '10px',
          }}>
            <input
              readOnly
              placeholder="메시지를 입력하세요..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '13px',
                color: 'var(--mid-brown)',
                outline: 'none',
              }}
            />
            <button style={{
              background: 'var(--gold)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '12px',
              color: 'white',
              cursor: 'pointer',
            }}>전송</button>
          </div>
        </div>
      ),
    },
  },
];

export default function AIFeaturesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="ai-features" className="mob-section" style={{ background: 'var(--deep-brown)', padding: '120px 60px' }}>
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
            AI TECHNOLOGY
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontFamily: 'var(--font-noto-serif)',
            color: 'var(--cream)',
            fontWeight: 300,
            marginBottom: '20px',
            lineHeight: 1.3,
          }}>
            AI로 고인을 기억하다
          </h2>
          <p style={{ color: 'var(--gold-light)', fontSize: '15px', lineHeight: '1.9', opacity: 0.8, maxWidth: '520px', margin: '0 auto' }}>
            최첨단 AI 기술로 목소리, 얼굴, 이야기를 복원하여<br />
            영원히 곁에 있는 것처럼 느낄 수 있습니다.
          </p>
        </div>

        <div className="mob-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          {/* Left: Feature List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {features.map((f, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: '28px 32px',
                  borderRadius: '16px',
                  background: active === i ? 'rgba(200,169,110,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active === i ? 'rgba(200,169,110,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: active === i ? '16px' : '0' }}>
                  <span style={{ fontSize: '28px' }}>{f.icon}</span>
                  <div>
                    <span style={{
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                      color: 'var(--gold)',
                      display: 'block',
                      marginBottom: '4px',
                    }}>
                      {f.tag}
                    </span>
                    <h3 style={{
                      color: 'var(--cream)',
                      fontFamily: 'var(--font-noto-serif)',
                      fontSize: '18px',
                      fontWeight: 400,
                    }}>
                      {f.title}
                    </h3>
                  </div>
                </div>
                {active === i && (
                  <>
                    <p style={{
                      color: 'var(--gold-light)',
                      fontSize: '14px',
                      lineHeight: '1.9',
                      opacity: 0.8,
                      marginBottom: '16px',
                    }}>
                      {f.desc}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {f.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: '4px 12px',
                            border: '1px solid rgba(200,169,110,0.3)',
                            borderRadius: '20px',
                            fontSize: '11px',
                            color: 'var(--gold-light)',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Right: Demo Preview */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              background: 'rgba(61,43,31,0.05)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(61,43,31,0.08)',
            }}>
              {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
                <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              ))}
              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#8A8A8A' }}>
                {features[active].tag} — 온기로 AI
              </span>
            </div>
            {features[active].demo.content}
          </div>
        </div>
      </div>
    </section>
  );
}
