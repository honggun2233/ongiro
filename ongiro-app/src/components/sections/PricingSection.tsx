'use client';

const plans = [
  {
    name: '기본', nameEn: 'STANDARD', price: '9,900', period: '/ 월 구독료 (납골당 계약 기본 포함)',
    features: ['디지털 추모 공간 1개', '사진 500장 / 영상 10개', '가족 초대 5명', '기본 AI 생애사 구성', '방명록 기능', '기일 알림 서비스'],
    cta: '시작하기', featured: false,
  },
  {
    name: '프리미엄', nameEn: 'PREMIUM', price: '19,900', period: '/ 월 구독료',
    features: ['디지털 추모 공간 1개', '무제한 사진 / 4K 영상', '가족 초대 무제한', 'AI 음성 복원 서비스', 'AI 영상 자동 편집', '대화형 AI 페르소나', '블록체인 영구 보존', 'IoT 납골당 연동'],
    cta: '시작하기', featured: true,
  },
  {
    name: '영구분양', nameEn: 'LIFETIME', price: '500만', period: '/ 일시납 (영구 보존)',
    features: ['프리미엄 모든 기능 포함', '물리적 납골당 연계 포함', '50년 이상 영구 보존', '전용 도메인 발급', '전담 케어 매니저', '상속·법률 서비스 패키지', 'VIP 오프라인 참배 서비스'],
    cta: '상담 신청', featured: false,
  },
];

interface PricingSectionProps {
  onOpenModal: () => void;
}

export default function PricingSection({ onOpenModal }: PricingSectionProps) {
  return (
    <div id="pricing" style={{ background: 'var(--deep-brown)' }}>
      <div className="max-w-6xl mx-auto py-32 px-16">
        <div className="text-xs tracking-widest uppercase flex items-center gap-4 mb-5" style={{ color: 'var(--gold)' }}>
          <span className="w-8 h-px block" style={{ background: 'var(--gold)' }} />
          요금제
        </div>
        <h2 className="text-4xl font-light mb-16 leading-snug" style={{ fontFamily: 'var(--font-noto-serif)', color: 'var(--cream)' }}>
          소중한 기억에<br /><strong className="font-semibold">맞는 플랜 선택</strong>
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {plans.map(({ name, nameEn, price, period, features, cta, featured }) => (
            <div key={nameEn} className="p-10 rounded-sm relative" style={{
              background: featured ? 'var(--gold)' : 'rgba(245,240,232,0.05)',
              border: featured ? 'none' : '1px solid rgba(245,240,232,0.1)',
            }}>
              {featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-4 py-1 rounded-sm tracking-wider"
                style={{ background: 'var(--deep-brown)', color: 'var(--gold)' }}>추천</div>}
              <div className="text-lg font-medium mb-1" style={{ fontFamily: 'var(--font-noto-serif)', color: featured ? 'var(--deep-brown)' : 'var(--cream)' }}>{name}</div>
              <div className="text-xs tracking-widest mb-6" style={{ color: featured ? 'rgba(61,43,31,0.5)' : 'var(--soft-gray)' }}>{nameEn}</div>
              <div className="text-4xl font-semibold mb-1" style={{ fontFamily: 'var(--font-noto-serif)', color: featured ? 'var(--deep-brown)' : 'var(--cream)' }}>
                <span className="text-xl">₩</span>{price}
              </div>
              <div className="text-xs mb-8" style={{ color: featured ? 'rgba(61,43,31,0.6)' : 'var(--soft-gray)' }}>{period}</div>
              <div className="w-full h-px mb-8" style={{ background: featured ? 'rgba(61,43,31,0.15)' : 'rgba(245,240,232,0.1)' }} />
              <ul className="list-none flex flex-col gap-3 mb-10">
                {features.map((f) => (
                  <li key={f} className="text-sm flex items-start gap-2" style={{ color: featured ? 'var(--deep-brown)' : 'rgba(245,240,232,0.7)' }}>
                    <span style={{ color: featured ? 'var(--deep-brown)' : 'var(--gold)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={onOpenModal} className="w-full py-4 text-sm font-medium tracking-wider cursor-pointer border-none rounded-sm transition-all"
                style={{
                  background: featured ? 'var(--deep-brown)' : 'transparent',
                  color: featured ? 'var(--gold)' : 'var(--cream)',
                  border: featured ? 'none' : '1px solid rgba(245,240,232,0.3)',
                }}>
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
