const features = [
  { icon: '🌸', title: '디지털 추모 공간\n개인 분양', desc: '암호화된 개인 계정으로 관리되는 독립 추모 공간. 추모공원 실물 납골당과 1:1 연계된 디지털 트윈 서비스를 제공합니다.', tag: 'Real+Digital' },
  { icon: '📸', title: '생애사 사진·영상\n아카이브', desc: '출생부터 현재까지의 소중한 순간들을 안전하게 업로드하고, 아름다운 타임라인 형태로 보존합니다. 4K 영상 지원.', tag: '무제한 저장' },
  { icon: '🤖', title: 'AI 고인 페르소나\n영상 생성', desc: '생전 기록과 목소리를 기반으로 AI가 대화형 영상을 생성합니다. 미래 세대도 故人과 대화하는 듯한 경험을 제공합니다.', tag: 'AI 기술' },
  { icon: '👨‍👩‍👧‍👦', title: '가족 공유\n커뮤니티', desc: '가족 구성원이 함께 추억을 올리고, 방명록을 남기며, 기일에 맞춰 알림을 받는 프라이빗 가족 공간입니다.', tag: '프라이빗' },
  { icon: '⚖️', title: '상속·법률 서비스\n연계', desc: '유언장 작성, 상속 컨설팅, 사전연명의료의향서 등 생애 후반부에 필요한 법률 서비스를 원스톱으로 제공합니다.', tag: '파트너 연계' },
  { icon: '🌿', title: '산분장·자연장\n디지털 연계', desc: '2025년 합법화된 산분장 서비스와 연계, GPS 기반 추모지 관리 및 IoT 센서를 통한 자연장지 실시간 모니터링을 제공합니다.', tag: 'IoT 연동' },
];

export default function FeaturesSection() {
  return (
    <div style={{ background: 'var(--warm-white)' }}>
      <section id="features" className="py-32 px-16 max-w-6xl mx-auto">
        <div className="text-xs tracking-widest uppercase flex items-center gap-4 mb-5" style={{ color: 'var(--gold)' }}>
          <span className="w-8 h-px block" style={{ background: 'var(--gold)' }} />
          서비스 소개
        </div>
        <h2 className="text-4xl font-light mb-5 leading-snug" style={{ fontFamily: 'var(--font-noto-serif)', color: 'var(--deep-brown)' }}>
          단순한 추모를 넘어<br /><strong className="font-semibold">살아있는 기억의 공간</strong>
        </h2>
        <p className="text-sm leading-loose max-w-xl mb-16" style={{ color: 'var(--soft-gray)' }}>
          온기로는 오프라인 추모공원과 연계된 Real+Digital 통합 플랫폼으로, 故人의 삶을 입체적으로 보존하고 공유합니다.
        </p>
      </section>
      <div className="grid grid-cols-3 gap-px max-w-6xl mx-auto px-16 pb-32" style={{ background: 'rgba(107,76,59,0.1)' }}>
        {features.map(({ icon, title, desc, tag }) => (
          <div key={tag} className="p-10 transition-all duration-300 hover:-translate-y-1" style={{ background: 'var(--warm-white)' }}>
            <span className="text-4xl mb-6 block">{icon}</span>
            <h3 className="text-lg font-medium mb-3 leading-snug whitespace-pre-line" style={{ fontFamily: 'var(--font-noto-serif)', color: 'var(--deep-brown)' }}>
              {title}
            </h3>
            <p className="text-sm leading-loose mb-5" style={{ color: 'var(--soft-gray)' }}>{desc}</p>
            <span className="text-xs px-3 py-1 rounded-sm tracking-wide" style={{ background: 'rgba(200,169,110,0.12)', color: 'var(--light-brown)' }}>
              {tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
