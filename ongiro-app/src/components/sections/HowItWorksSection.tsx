const steps = [
  {
    num: '01',
    title: '추모 공간 개설',
    desc: '이름, 사진, 생애 정보 입력 — 5분이면 충분합니다.',
  },
  {
    num: '02',
    title: '추억으로 채우기',
    desc: '사진·영상을 올리고 가족 모두가 함께 이야기를 더합니다.',
  },
  {
    num: '03',
    title: '언제나 함께',
    desc: '기일 알림, AI 대화, 가족 공유로 항상 곁에 느낄 수 있습니다.',
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="mob-section"
      style={{ background: 'var(--cream)', padding: '80px 60px' }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(200,169,110,0.3)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: 'var(--gold)',
              fontFamily: 'var(--font-noto-serif)',
            }}>
              HOW IT WORKS
            </span>
          </div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(200,169,110,0.3)' }} />
        </div>

        <h2 className="mob-center" style={{
          fontSize: 'clamp(22px, 3vw, 32px)',
          fontFamily: 'var(--font-noto-serif)',
          color: 'var(--deep-brown)',
          fontWeight: 300,
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          시작은 어렵지 않습니다
        </h2>

        {/* 스텝 가로 배치 */}
        <div className="mob-grid-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
        }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="how-divider"
              style={{
                padding: '0 40px',
                textAlign: 'center',
                borderRight: i < steps.length - 1
                  ? '1px solid rgba(200,169,110,0.2)'
                  : 'none',
              }}
            >
              {/* 번호 */}
              <div style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '36px',
                color: 'var(--gold)',
                opacity: 0.5,
                lineHeight: 1,
                marginBottom: '12px',
              }}>
                {step.num}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-noto-serif)',
                fontSize: '16px',
                color: 'var(--deep-brown)',
                fontWeight: 500,
                marginBottom: '10px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'var(--soft-gray)',
                lineHeight: '1.8',
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 한 줄 통계 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          marginTop: '48px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(61,43,31,0.08)',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '5분', label: '개설 시간' },
            { value: '무제한', label: '사진·영상 저장' },
            { value: '24/7', label: 'AI 대화' },
            { value: '가족 전체', label: '공동 편집' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '20px',
                color: 'var(--deep-brown)',
                marginBottom: '4px',
              }}>
                {value}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--soft-gray)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
