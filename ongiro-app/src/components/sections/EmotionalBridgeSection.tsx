export default function EmotionalBridgeSection() {
  return (
    <section
      id="bridge"
      className="mob-section"
      style={{
        background: 'var(--cream)',
        padding: '120px 60px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* 위에서 내려오는 선 — 히어로의 어둠에서 빛으로 */}
        <div className="mob-hide" style={{
          width: '1px',
          height: '72px',
          background: 'linear-gradient(to bottom, transparent, var(--gold))',
          margin: '0 auto 52px',
        }} />

        <p style={{
          fontSize: 'clamp(24px, 3.5vw, 38px)',
          fontFamily: 'var(--font-noto-serif)',
          color: 'var(--deep-brown)',
          fontWeight: 300,
          lineHeight: 1.7,
          marginBottom: '32px',
          letterSpacing: '0.02em',
        }}>
          그리운 사람이 있으신가요?
        </p>

        <p style={{
          fontSize: '16px',
          color: 'var(--mid-brown)',
          lineHeight: '2.1',
          marginBottom: '56px',
          fontFamily: 'var(--font-noto-serif)',
          fontWeight: 300,
        }}>
          누구나 언젠가는 소중한 사람을 떠나보냅니다.<br />
          그 기억이 흐려지지 않도록,<br />
          온기로가 함께하고 싶습니다.
        </p>

        <div style={{
          display: 'flex',
          gap: '48px',
          justifyContent: 'center',
          marginBottom: '56px',
        }}>
          {[
            { icon: '📸', text: '소중한 사진 한 장' },
            { icon: '🎙', text: '목소리의 온기' },
            { icon: '💌', text: '전하지 못한 말들' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
              <p style={{
                fontSize: '13px',
                color: 'var(--soft-gray)',
                fontFamily: 'var(--font-noto-serif)',
                letterSpacing: '0.05em',
              }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* 아래로 이어지는 선 */}
        <div className="mob-hide" style={{
          width: '1px',
          height: '72px',
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          margin: '0 auto',
        }} />
      </div>
    </section>
  );
}
