'use client';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  function handleSubmit() {
    const btn = document.querySelector('.btn-submit') as HTMLButtonElement;
    if (btn) {
      btn.textContent = '✓ 신청 완료! 곧 연락드리겠습니다';
      btn.style.background = '#8A9A7E';
      setTimeout(() => { onClose(); btn.textContent = '신청서 제출하기'; btn.style.background = ''; }, 2000);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(61,43,31,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-sm p-10"
        style={{ background: 'var(--warm-white)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xl cursor-pointer border-none bg-transparent"
          style={{ color: 'var(--soft-gray)' }}
        >
          ✕
        </button>
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
          추모 공간 신청
        </div>
        <h2 className="text-2xl mb-8 font-serif" style={{ fontFamily: 'var(--font-noto-serif)', color: 'var(--deep-brown)' }}>
          디지털 추모 공간<br />분양 신청
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs" style={{ color: 'var(--mid-brown)' }}>신청자 성함</label>
              <input type="text" placeholder="홍길동" className="px-4 py-3 border text-sm outline-none rounded-sm" style={{ borderColor: 'rgba(107,76,59,0.2)', background: 'white' }} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs" style={{ color: 'var(--mid-brown)' }}>연락처</label>
              <input type="tel" placeholder="010-0000-0000" className="px-4 py-3 border text-sm outline-none rounded-sm" style={{ borderColor: 'rgba(107,76,59,0.2)', background: 'white' }} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs" style={{ color: 'var(--mid-brown)' }}>故人 성함</label>
            <input type="text" placeholder="고인의 성함을 입력해주세요" className="px-4 py-3 border text-sm outline-none rounded-sm" style={{ borderColor: 'rgba(107,76,59,0.2)', background: 'white' }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs" style={{ color: 'var(--mid-brown)' }}>생년월일</label>
              <input type="date" className="px-4 py-3 border text-sm outline-none rounded-sm" style={{ borderColor: 'rgba(107,76,59,0.2)', background: 'white' }} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs" style={{ color: 'var(--mid-brown)' }}>기일</label>
              <input type="date" className="px-4 py-3 border text-sm outline-none rounded-sm" style={{ borderColor: 'rgba(107,76,59,0.2)', background: 'white' }} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs" style={{ color: 'var(--mid-brown)' }}>관심 요금제</label>
            <select className="px-4 py-3 border text-sm outline-none rounded-sm" style={{ borderColor: 'rgba(107,76,59,0.2)', background: 'white' }}>
              <option>기본 (₩9,900/월)</option>
              <option>프리미엄 (₩19,900/월)</option>
              <option>영구분양 (₩500만 일시납)</option>
              <option>상담 후 결정</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs" style={{ color: 'var(--mid-brown)' }}>연계 추모공원 / 납골당</label>
            <input type="text" placeholder="현재 이용 중이신 추모공원명 (없으면 비워두세요)" className="px-4 py-3 border text-sm outline-none rounded-sm" style={{ borderColor: 'rgba(107,76,59,0.2)', background: 'white' }} />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-submit py-4 text-sm font-medium tracking-wider cursor-pointer border-none rounded-sm transition-all"
            style={{ background: 'var(--deep-brown)', color: 'var(--cream)' }}
          >
            신청서 제출하기
          </button>
        </form>
        <p className="text-xs text-center mt-4" style={{ color: 'var(--soft-gray)' }}>
          개인정보는 서비스 안내 목적으로만 사용되며<br />제3자에게 제공되지 않습니다.
        </p>
      </div>
    </div>
  );
}
