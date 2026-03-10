export default function Footer() {
  return (
    <footer style={{ background: '#1A1008' }}>
      <div className="max-w-6xl mx-auto px-16 py-16">
        <div className="flex justify-between mb-12">
          <div>
            <div className="text-2xl mb-3" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--cream)' }}>Ongiro</div>
            <p className="text-sm leading-loose" style={{ color: 'var(--soft-gray)' }}>
              예술과 나눔을 엮어 지속 가능한<br />문화와 복지를 가꾸는 선한 플랫폼
            </p>
          </div>
          <div className="flex gap-16">
            {[
              { title: '서비스', links: ['디지털 추모 공간', 'AI 페르소나', '생애사 아카이브', '상속·법률 서비스'] },
              { title: '파트너', links: ['추모공원 파트너십', '병원·장례식장 제휴', 'B2B 솔루션'] },
              { title: '회사', links: ['소개', 'ESG 활동', '투자자 정보', '채용'] },
            ].map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-3">
                <h4 className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>{title}</h4>
                {links.map((link) => (
                  <a key={link} href="#" className="text-sm no-underline transition-colors" style={{ color: 'var(--soft-gray)' }}>{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-8" style={{ borderTop: '1px solid rgba(245,240,232,0.08)' }}>
          <span className="text-xs" style={{ color: 'var(--soft-gray)' }}>© 2025 Ongiro (온기로). All rights reserved.</span>
          <div className="flex gap-6">
            {['이용약관', '개인정보처리방침', '고객센터'].map((link) => (
              <a key={link} href="#" className="text-xs no-underline" style={{ color: 'var(--soft-gray)' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
