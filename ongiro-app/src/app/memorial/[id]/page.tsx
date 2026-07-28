'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const memorialData: Record<string, {
  name: string;
  born: string;
  died: string;
  age: number;
  initial: string;
  accentColor: string;
  quote: string;
  intro: string;
  timeline: { year: string; title: string; desc: string }[];
  photos: { emoji: string; caption: string; year: string }[];
  guestbook: { name: string; relation: string; message: string; date: string }[];
  isPet?: boolean;
  petType?: string;
}> = {
  'demo-1': {
    name: '김정수',
    born: '1945년 6월 12일',
    died: '2024년 3월 8일',
    age: 78,
    initial: '김',
    accentColor: '#C8A96E',
    quote: '가족을 위해 평생을 바치신 아버지, 당신의 사랑은 영원합니다.',
    intro: '경상남도 진주에서 태어나 평생을 성실하게 살아오신 김정수 님. 3남 2녀의 아버지로서, 두 손으로 가족을 일으켜 세우신 우리의 자랑스러운 아버지이십니다. 퇴직 후에는 텃밭 가꾸기와 손자녀들과 함께하는 시간을 가장 소중히 여기셨습니다.',
    timeline: [
      { year: '1945', title: '경남 진주에서 출생', desc: '경상남도 진주시에서 3남 중 장남으로 태어나셨습니다.' },
      { year: '1965', title: '서울 상경 및 취업', desc: '더 나은 미래를 위해 홀로 서울로 올라와 제조업에 종사하셨습니다.' },
      { year: '1972', title: '결혼', desc: '평생의 반려자 이순자 여사와 혼인하셨습니다. 검소하고 아름다운 예식이었습니다.' },
      { year: '1975', title: '장남 출생', desc: '첫 아이 탄생에 평생 잊지 못할 기쁨을 누리셨다 하셨습니다.' },
      { year: '1990', title: '가업 안정화', desc: '가족의 헌신으로 작은 사업체를 안정적으로 운영하게 되셨습니다.' },
      { year: '2010', title: '퇴직 후 귀농', desc: '50년 도시 생활을 마치고 경기도 양평으로 내려가 텃밭을 가꾸셨습니다.' },
      { year: '2024', title: '영면에 드시다', desc: '78세를 일기로 가족 곁에서 편안히 눈을 감으셨습니다.' },
    ],
    photos: [
      { emoji: '👴', caption: '1990년 가족사진', year: '1990' },
      { emoji: '🌾', caption: '텃밭에서', year: '2015' },
      { emoji: '👶', caption: '손자와 함께', year: '2018' },
      { emoji: '🎂', caption: '칠순 잔치', year: '2015' },
      { emoji: '🌸', caption: '봄 나들이', year: '2020' },
      { emoji: '🏠', caption: '양평 귀농 첫해', year: '2010' },
    ],
    guestbook: [
      { name: '김민준', relation: '장남', message: '아버지, 보고 싶습니다. 평생 저희를 위해 헌신해주셔서 감사합니다. 하늘에서도 행복하세요.', date: '2024.03.15' },
      { name: '이순자', relation: '배우자', message: '여보, 우리가 함께했던 52년이 너무 소중했어요. 하늘나라에서 기다려요.', date: '2024.03.10' },
      { name: '김지현', relation: '손녀', message: '할아버지가 항상 제 편이 되어주셔서 감사해요. 보고 싶어요 할아버지.', date: '2024.04.02' },
    ],
  },
  'demo-2': {
    name: '박순희',
    born: '1948년 2월 20일',
    died: '2023년 11월 15일',
    age: 75,
    initial: '박',
    accentColor: '#C4977A',
    quote: '따뜻한 미소와 손길로 우리를 보듬어 주셨던 어머니.',
    intro: '전라북도 전주 출신으로, 요리와 뜨개질을 사랑하셨던 박순희 님. 자녀 다섯을 홀로 키우며 한 번도 힘들다 내색하지 않으셨던 우리의 어머니. 동네 어르신들께도 늘 따뜻한 미소를 나눠주셨습니다.',
    timeline: [
      { year: '1948', title: '전북 전주에서 출생', desc: '넉넉하지 않은 가정에서 태어나 어릴 때부터 부지런히 사셨습니다.' },
      { year: '1970', title: '결혼', desc: '22세에 혼인하셔서 새로운 가정을 꾸리셨습니다.' },
      { year: '1985', title: '가족 서울 이사', desc: '자녀 교육을 위해 서울로 이주하셨습니다.' },
      { year: '2000', title: '문화센터 뜨개질 강사', desc: '재능을 살려 동네 문화센터에서 뜨개질 강사로 활동하셨습니다.' },
      { year: '2015', title: '손자녀들의 탄생', desc: '손자녀들이 생겨 인생에서 가장 행복한 시간을 보내셨습니다.' },
      { year: '2023', title: '영면에 드시다', desc: '75세를 일기로 자녀들이 지켜보는 가운데 평안히 눈을 감으셨습니다.' },
    ],
    photos: [
      { emoji: '👩', caption: '젊은 시절', year: '1975' },
      { emoji: '🧶', caption: '뜨개질 작품 전시', year: '2005' },
      { emoji: '🍚', caption: '명절 요리', year: '2010' },
      { emoji: '🌺', caption: '꽃밭에서', year: '2018' },
      { emoji: '👶', caption: '첫 손자와', year: '2015' },
      { emoji: '🎀', caption: '칠순 기념', year: '2018' },
    ],
    guestbook: [
      { name: '박성호', relation: '장남', message: '어머니, 평생 저희를 위해 희생해 주셨는데 제대로 효도도 못 했어요. 하늘에서 편히 쉬세요.', date: '2023.11.20' },
      { name: '김이웃', relation: '이웃', message: '항상 우리 동네에 따뜻한 웃음을 주시던 순희 어머니. 너무 그리울 거예요.', date: '2023.12.01' },
      { name: '박수빈', relation: '손녀', message: '할머니가 떠주신 스웨터 평생 간직할게요. 사랑해요 할머니.', date: '2023.12.15' },
    ],
  },
  'demo-3': {
    name: '이태영',
    born: '1962년 9월 5일',
    died: '2022년 7월 22일',
    age: 59,
    initial: '이',
    accentColor: '#8A9A7E',
    quote: '언제나 우리의 든든한 버팀목이 되어주셨습니다.',
    intro: '서울 출신으로 엔지니어로서 평생을 성실하게 살아오신 이태영 님. 주말마다 아이들을 데리고 등산을 다니셨고, 음악과 독서를 즐기셨습니다. 갑작스러운 이별이었지만 그분의 이야기는 우리 가슴속에 영원히 살아있습니다.',
    timeline: [
      { year: '1962', title: '서울 출생', desc: '서울 성북구에서 태어나셨습니다.' },
      { year: '1985', title: '대학 졸업, 첫 취직', desc: '기계공학과를 졸업하고 제조회사에 입사하셨습니다.' },
      { year: '1990', title: '결혼', desc: '현재의 배우자와 혼인하여 새 가정을 꾸리셨습니다.' },
      { year: '2000', title: '부장 승진', desc: '오랜 노력 끝에 부장으로 승진하셔서 가족 모두가 기뻐했습니다.' },
      { year: '2015', title: '취미 밴드 활동', desc: '회사 동료들과 함께 어쿠스틱 밴드를 결성해 작은 공연을 하셨습니다.' },
      { year: '2022', title: '영면에 드시다', desc: '59세를 일기로 갑자기 우리 곁을 떠나셨습니다.' },
    ],
    photos: [
      { emoji: '🏔', caption: '북한산 등산', year: '2010' },
      { emoji: '🎸', caption: '밴드 공연', year: '2018' },
      { emoji: '📚', caption: '독서 중', year: '2019' },
      { emoji: '👨‍👧', caption: '딸과 함께', year: '2015' },
      { emoji: '🎂', caption: '생일 파티', year: '2020' },
      { emoji: '🚵', caption: '자전거 여행', year: '2017' },
    ],
    guestbook: [
      { name: '이정은', relation: '배우자', message: '당신 없는 세상이 너무 낯설어요. 그래도 당신이 남겨준 추억으로 잘 살아갈게요. 사랑해요.', date: '2022.08.01' },
      { name: '이준호', relation: '아들', message: '아빠, 주말마다 같이 등산 가던 거 잊지 못해요. 아빠 덕분에 강해질 수 있었어요.', date: '2022.08.15' },
      { name: '최동료', relation: '직장 동료', message: '태영이형, 밴드 연습하던 날들이 그립습니다. 하늘에서도 기타 치고 계시죠?', date: '2022.09.01' },
    ],
  },
  'pet-1': {
    name: '보리',
    born: '2012년 4월 15일',
    died: '2024년 8월 23일',
    age: 12,
    initial: '🐕',
    accentColor: '#C8A96E',
    quote: '12년 동안 우리 가족의 햇살이었어. 영원히 사랑해.',
    intro: '골든 리트리버 보리는 2012년 봄, 이가족의 품에 안겼습니다. 항상 꼬리를 흔들며 가족을 반겨주던 보리. 슬플 때나 기쁠 때나 늘 곁에 있어주었고, 아이들이 자라는 동안 최고의 친구가 되어주었습니다.',
    isPet: true,
    petType: '골든 리트리버',
    timeline: [
      { year: '2012', title: '이가족의 품에 오다', desc: '봄날 3개월령의 보리가 우리 가족이 되었습니다.' },
      { year: '2014', title: '첫 운동회 참가', desc: '동네 반려동물 운동회에서 달리기 1등을 했습니다!' },
      { year: '2016', title: '첫 바다 여행', desc: '부산 해운대에서 파도와 놀며 너무 행복해했습니다.' },
      { year: '2018', title: '둘째 아이의 탄생', desc: '새 가족에게도 변함없이 애교를 부려주었습니다.' },
      { year: '2022', title: '10살 생일 파티', desc: '케이크 대신 강아지 간식 케이크로 생일을 축하했습니다.' },
      { year: '2024', title: '무지개다리를 건너다', desc: '12년간 가족의 사랑을 듬뿍 받고 평안히 잠들었습니다.' },
    ],
    photos: [
      { emoji: '🐾', caption: '강아지 시절', year: '2012' },
      { emoji: '🏖', caption: '첫 바다 여행', year: '2016' },
      { emoji: '🍂', caption: '가을 산책', year: '2019' },
      { emoji: '🎂', caption: '10살 생일', year: '2022' },
      { emoji: '🌸', caption: '봄 공원', year: '2021' },
      { emoji: '❄', caption: '첫 눈 구경', year: '2013' },
    ],
    guestbook: [
      { name: '이민서', relation: '보호자', message: '보리야, 12년 동안 우리 가족의 햇살이 되어줘서 고마워. 무지개다리 건너서도 행복하게 뛰어다녀.', date: '2024.08.25' },
      { name: '이준', relation: '아들', message: '보리 없이 학교 다녀오는 게 너무 이상해. 항상 반겨줘서 고마웠어.', date: '2024.09.01' },
      { name: '박수의', relation: '이웃', message: '동네 산책할 때마다 꼬리 흔들어 주던 보리. 많이 그리울 거예요.', date: '2024.09.05' },
    ],
  },
  'pet-2': {
    name: '나비',
    born: '2015년 9월 2일',
    died: '2023년 12월 30일',
    age: 8,
    initial: '🐈',
    accentColor: '#8A9A7E',
    quote: '늘 내 곁에서 그르렁거려주던 너, 보고 싶어.',
    intro: '코리안 숏헤어 나비는 2015년 가을, 김가족의 집에 찾아왔습니다. 처음엔 낯을 가리더니 곧 가족 모두의 무릎을 차지하게 된 사랑스러운 고양이. 8년간 매일 아침 집사의 얼굴을 꾹꾹이로 깨워주었습니다.',
    isPet: true,
    petType: '코리안 숏헤어',
    timeline: [
      { year: '2015', title: '김가족의 집에 오다', desc: '길고양이로 발견된 나비를 입양했습니다.' },
      { year: '2016', title: '집 적응 완료', desc: '처음엔 숨어만 있더니 이제 소파를 점령했습니다.' },
      { year: '2018', title: '인스타 스타', desc: '나비 인스타그램 팔로워가 2000명을 넘었습니다!' },
      { year: '2021', title: '최애 장난감 발견', desc: '깃털 장난감만 보면 눈이 빛나는 나비.' },
      { year: '2023', title: '무지개다리를 건너다', desc: '8년간 집사를 행복하게 해주고 평안히 잠들었습니다.' },
    ],
    photos: [
      { emoji: '🐱', caption: '처음 집에 온 날', year: '2015' },
      { emoji: '😺', caption: '햇볕 쬐기', year: '2018' },
      { emoji: '🛋', caption: '소파 점령', year: '2019' },
      { emoji: '🧶', caption: '장난감 탐색', year: '2020' },
      { emoji: '🌙', caption: '달빛 아래', year: '2022' },
      { emoji: '💤', caption: '낮잠 중', year: '2023' },
    ],
    guestbook: [
      { name: '김수진', relation: '보호자', message: '나비야, 8년 동안 매일 아침 깨워줘서 고마워. 무지개다리 건너가서도 행복하게 꾹꾹이 해줘.', date: '2024.01.02' },
      { name: '김태민', relation: '아들', message: '나비 없는 집이 너무 허전해요. 쉬는 날 무릎 위에 올라와 주던 거 그리워요.', date: '2024.01.10' },
    ],
  },
};

const tabs = ['생애 이야기', '사진 앨범', '방명록', 'AI 대화'];

export default function MemorialPage() {
  const params = useParams();
  const id = params.id as string;
  const data = memorialData[id];
  const [activeTab, setActiveTab] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [newName, setNewName] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'ai', text: `안녕하세요. 저는 ${data?.name}의 AI 페르소나입니다. 무엇이든 물어보세요.` },
  ]);

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--warm-white)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--soft-gray)', marginBottom: '16px' }}>추모 공간을 찾을 수 없습니다.</p>
          <Link href="/memorials" style={{ color: 'var(--deep-brown)', textDecoration: 'none' }}>← 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { from: 'user', text: chatInput };
    const aiResponse = { from: 'ai', text: `${chatInput}에 대해 말씀해주셨군요. ${data.name}${data.isPet ? '도' : '께서도'} 그런 이야기를 ${data.isPet ? '좋아했을' : '하시곤 했습니다'}. 더 궁금한 것이 있으신가요?` };
    setChatMessages(prev => [...prev, userMsg, aiResponse]);
    setChatInput('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--warm-white)' }}>
      {/* Header */}
      <div className="mob-section" style={{
        background: 'var(--deep-brown)',
        padding: '80px 60px 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 50%, ${data.accentColor}22 0%, transparent 60%)`,
        }} />

        {/* Back */}
        <Link
          href="/memorials"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--gold-light)',
            textDecoration: 'none',
            fontSize: '13px',
            letterSpacing: '0.1em',
            marginBottom: '48px',
            opacity: 0.7,
          }}
        >
          ← 추모 공간 목록
        </Link>

        <div className="mob-col" style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '48px', alignItems: 'center', position: 'relative' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${data.accentColor}, ${data.accentColor}88)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: data.isPet ? '52px' : '44px',
            color: 'white',
            fontFamily: 'var(--font-noto-serif)',
            border: '4px solid rgba(255,255,255,0.15)',
            flexShrink: 0,
          }}>
            {data.initial}
          </div>
          <div>
            {data.isPet && (
              <span style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: data.accentColor,
                display: 'block',
                marginBottom: '8px',
              }}>
                {data.petType}
              </span>
            )}
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontFamily: 'var(--font-noto-serif)',
              color: 'var(--cream)',
              fontWeight: 300,
              marginBottom: '12px',
            }}>
              {data.name}
            </h1>
            <p style={{ color: 'var(--gold-light)', fontSize: '14px', letterSpacing: '0.1em', marginBottom: '20px', opacity: 0.8 }}>
              {data.born} — {data.died} ({data.age}세)
            </p>
            <p style={{
              color: 'var(--cream)',
              fontFamily: 'var(--font-noto-serif)',
              fontSize: '16px',
              fontStyle: 'italic',
              opacity: 0.75,
              maxWidth: '480px',
              lineHeight: '1.7',
            }}>
              &ldquo;{data.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        borderBottom: '1px solid rgba(61,43,31,0.1)',
        background: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div className="mob-px" style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', padding: '0 60px', overflowX: 'auto' }}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '18px 28px',
                border: 'none',
                background: 'transparent',
                fontSize: '14px',
                fontFamily: 'var(--font-noto-serif)',
                color: activeTab === i ? 'var(--deep-brown)' : 'var(--soft-gray)',
                borderBottom: activeTab === i ? `2px solid ${data.accentColor}` : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.05em',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mob-section" style={{ maxWidth: '960px', margin: '0 auto', padding: '60px' }}>

        {/* Tab 0: 생애 이야기 */}
        {activeTab === 0 && (
          <div>
            <p style={{
              fontSize: '16px',
              color: 'var(--mid-brown)',
              lineHeight: '2',
              fontFamily: 'var(--font-noto-serif)',
              marginBottom: '56px',
              padding: '32px',
              background: 'white',
              borderRadius: '16px',
              borderLeft: `4px solid ${data.accentColor}`,
            }}>
              {data.intro}
            </p>
            <h3 style={{
              fontFamily: 'var(--font-noto-serif)',
              fontSize: '20px',
              color: 'var(--deep-brown)',
              fontWeight: 400,
              marginBottom: '40px',
            }}>생애 타임라인</h3>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '80px',
                top: 0,
                bottom: 0,
                width: '1px',
                background: `linear-gradient(to bottom, ${data.accentColor}44, transparent)`,
              }} />
              {data.timeline.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '32px', marginBottom: '40px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '80px',
                    textAlign: 'right',
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '15px',
                    color: data.accentColor,
                    paddingTop: '4px',
                    flexShrink: 0,
                  }}>
                    {item.year}
                  </div>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: data.accentColor,
                    marginTop: '6px',
                    flexShrink: 0,
                    boxShadow: `0 0 0 4px ${data.accentColor}22`,
                  }} />
                  <div style={{
                    flex: 1,
                    background: 'white',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    boxShadow: '0 2px 16px rgba(61,43,31,0.06)',
                  }}>
                    <h4 style={{
                      fontFamily: 'var(--font-noto-serif)',
                      fontSize: '16px',
                      color: 'var(--deep-brown)',
                      fontWeight: 500,
                      marginBottom: '8px',
                    }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--soft-gray)', lineHeight: '1.7' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 1: 사진 앨범 */}
        {activeTab === 1 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-noto-serif)',
              fontSize: '20px',
              color: 'var(--deep-brown)',
              fontWeight: 400,
              marginBottom: '32px',
            }}>
              사진 앨범 ({data.photos.length}장)
            </h3>
            <div className="mob-grid-2" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}>
              {data.photos.map((photo, i) => (
                <div
                  key={i}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(61,43,31,0.07)',
                  }}
                >
                  <div style={{
                    aspectRatio: '1',
                    background: `linear-gradient(135deg, ${data.accentColor}22, ${data.accentColor}08)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '56px',
                  }}>
                    {photo.emoji}
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontSize: '13px', color: 'var(--deep-brown)', fontFamily: 'var(--font-noto-serif)', marginBottom: '4px' }}>
                      {photo.caption}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--soft-gray)' }}>{photo.year}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '32px',
              padding: '24px',
              background: 'white',
              borderRadius: '12px',
              border: '2px dashed rgba(61,43,31,0.12)',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--soft-gray)', fontSize: '14px', marginBottom: '12px' }}>
                소중한 사진을 추가해보세요
              </p>
              <button style={{
                background: data.accentColor,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontSize: '13px',
                cursor: 'pointer',
              }}>
                사진 업로드
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: 방명록 */}
        {activeTab === 2 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-noto-serif)',
              fontSize: '20px',
              color: 'var(--deep-brown)',
              fontWeight: 400,
              marginBottom: '32px',
            }}>
              방명록 ({data.guestbook.length}개)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {data.guestbook.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px 28px',
                    boxShadow: '0 2px 16px rgba(61,43,31,0.07)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: `${data.accentColor}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: data.accentColor,
                      fontFamily: 'var(--font-noto-serif)',
                      fontWeight: 500,
                    }}>
                      {entry.name[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--deep-brown)' }}>{entry.name}</p>
                      <p style={{ fontSize: '12px', color: 'var(--soft-gray)' }}>{entry.relation} · {entry.date}</p>
                    </div>
                    <span style={{ marginLeft: 'auto', fontSize: '16px' }}>🕯</span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--mid-brown)',
                    lineHeight: '1.8',
                    fontFamily: 'var(--font-noto-serif)',
                  }}>
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>

            {/* 방명록 작성 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px 32px',
              boxShadow: '0 2px 16px rgba(61,43,31,0.07)',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-noto-serif)',
                fontSize: '16px',
                color: 'var(--deep-brown)',
                fontWeight: 400,
                marginBottom: '20px',
              }}>
                추모 메시지 남기기
              </h4>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="이름 (예: 홍길동)"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(61,43,31,0.15)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '12px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-noto-sans)',
                }}
              />
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`${data.name}${data.isPet ? '에게' : '께'} 전하고 싶은 말을 적어주세요...`}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(61,43,31,0.15)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '16px',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-noto-sans)',
                  lineHeight: '1.7',
                }}
              />
              <button
                style={{
                  background: 'var(--deep-brown)',
                  color: 'var(--cream)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-noto-serif)',
                  letterSpacing: '0.05em',
                }}
              >
                🕯 메시지 남기기
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: AI 대화 */}
        {activeTab === 3 && (
          <div>
            <div style={{
              background: 'var(--deep-brown)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(61,43,31,0.15)',
            }}>
              {/* Chat header */}
              <div style={{
                padding: '24px 28px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${data.accentColor}, ${data.accentColor}88)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: data.isPet ? '20px' : '16px',
                  color: 'white',
                  fontFamily: 'var(--font-noto-serif)',
                }}>
                  {data.initial}
                </div>
                <div>
                  <p style={{ color: 'var(--cream)', fontSize: '15px', fontFamily: 'var(--font-noto-serif)' }}>
                    {data.name} AI 페르소나
                  </p>
                  <p style={{ color: 'var(--gold-light)', fontSize: '12px', opacity: 0.7 }}>
                    생전 기록을 학습한 AI
                  </p>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4CAF50',
                }} />
              </div>

              {/* Messages */}
              <div style={{
                padding: '24px 28px',
                minHeight: '320px',
                maxHeight: '420px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div style={{
                      maxWidth: '75%',
                      padding: '12px 18px',
                      borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: msg.from === 'user' ? data.accentColor : 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '14px',
                      lineHeight: '1.7',
                      fontFamily: 'var(--font-noto-sans)',
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                gap: '12px',
              }}>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder={`${data.name}${data.isPet ? '에게' : '께'} 말을 건네보세요...`}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'var(--font-noto-sans)',
                  }}
                />
                <button
                  onClick={handleChatSend}
                  style={{
                    background: data.accentColor,
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 20px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  전송
                </button>
              </div>
            </div>

            <p style={{
              textAlign: 'center',
              fontSize: '12px',
              color: 'var(--soft-gray)',
              marginTop: '16px',
              lineHeight: '1.7',
            }}>
              AI 페르소나는 생전 기록을 기반으로 대화합니다. 실제 응답과 다를 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
