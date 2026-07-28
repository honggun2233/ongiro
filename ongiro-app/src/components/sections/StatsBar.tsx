const stats = [
  { number: '7.7조', label: '상조 시장 규모' },
  { number: '45%', label: '50세 이상 인구 비율 (2025)' },
  { number: '110%', label: '화장률 증가' },
  { number: '500만', label: '예상 고객 생애 가치(LTV)' },
];

export default function StatsBar() {
  return (
    <div className="flex justify-around py-10 px-16" style={{ background: 'var(--cream)' }}>
      {stats.map(({ number, label }) => (
        <div key={label} className="text-center">
          <div className="text-3xl font-semibold mb-1" style={{ fontFamily: 'var(--font-noto-serif)', color: 'var(--deep-brown)' }}>
            {number}
          </div>
          <div className="text-xs tracking-wide" style={{ color: 'var(--soft-gray)' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}
