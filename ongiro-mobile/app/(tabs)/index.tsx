import { useRef, useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
  StyleSheet, Dimensions, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

// ─── 데이터 ───────────────────────────────────────────
const stats = [
  { number: '7.7조', label: '상조 시장 규모' },
  { number: '45%', label: '50세+ 인구 비율' },
  { number: '110%', label: '화장률 증가' },
  { number: '500만', label: '예상 LTV' },
];

const features = [
  { icon: '🌸', title: '디지털 추모 공간 개인 분양', desc: '납골당과 1:1 연계된 디지털 트윈 서비스', tag: 'Real+Digital' },
  { icon: '📸', title: '생애사 사진·영상 아카이브', desc: '출생부터 현재까지 타임라인으로 보존. 4K 지원', tag: '무제한 저장' },
  { icon: '🤖', title: 'AI 고인 페르소나 영상 생성', desc: '생전 기록으로 AI가 대화형 영상을 생성', tag: 'AI 기술' },
  { icon: '👨‍👩‍👧‍👦', title: '가족 공유 커뮤니티', desc: '프라이빗 가족 공간에서 함께 추모', tag: '프라이빗' },
  { icon: '⚖️', title: '상속·법률 서비스 연계', desc: '유언장·상속 컨설팅·사전연명의료 원스톱', tag: '파트너 연계' },
  { icon: '🌿', title: '산분장·자연장 디지털 연계', desc: 'GPS 기반 추모지 관리 및 IoT 모니터링', tag: 'IoT 연동' },
];

const steps = [
  { num: '01', title: '추모 공간 분양 신청', desc: '연계 추모공원 납골당 계약 시 디지털 공간이 자동 생성됩니다.' },
  { num: '02', title: '생애사 콘텐츠 업로드', desc: '사진, 영상, 육성 녹음을 업로드해 故人의 삶을 기록합니다.' },
  { num: '03', title: 'AI가 생애사를 완성', desc: 'AI가 내레이션, 영상 슬라이드쇼, 대화형 페르소나를 자동 생성합니다.' },
  { num: '04', title: '영원히 이어지는 기억', desc: '블록체인으로 영구 보존. 손자녀 세대까지 이어집니다.' },
];

const aiFeatures = [
  { icon: '🎙', title: 'AI 음성 복원', desc: '생전 육성을 기반으로 자연스러운 목소리 복원' },
  { icon: '🎬', title: 'AI 영상 슬라이드쇼', desc: '사진으로 감동적인 생애사 영상 자동 편집' },
  { icon: '🤖', title: '대화형 AI 페르소나', desc: '故人의 성격과 어투를 담은 AI 대화 에이전트' },
  { icon: '📊', title: 'AI 생애사 자동 구성', desc: '사진 메타데이터로 연대기 생애사 자동 작성' },
];

const plans = [
  {
    name: '기본', nameEn: 'STANDARD', price: '9,900', period: '/월',
    features: ['디지털 추모 공간 1개', '사진 500장 / 영상 10개', '가족 초대 5명', '기본 AI 생애사 구성', '방명록 기능', '기일 알림'],
    featured: false,
  },
  {
    name: '프리미엄', nameEn: 'PREMIUM', price: '19,900', period: '/월',
    features: ['무제한 사진 / 4K 영상', '가족 초대 무제한', 'AI 음성 복원', 'AI 영상 자동 편집', '대화형 AI 페르소나', '블록체인 영구 보존', 'IoT 납골당 연동'],
    featured: true,
  },
  {
    name: '영구분양', nameEn: 'LIFETIME', price: '500만', period: ' 일시납',
    features: ['프리미엄 모든 기능', '물리적 납골당 연계', '50년 이상 영구 보존', '전용 도메인 발급', '전담 케어 매니저', 'VIP 참배 서비스'],
    featured: false,
  },
];

const stories = [
  { initial: '이', name: '이○○ 님', role: '서울 · 프리미엄', text: '멀리 사는 동생도, 외국에 있는 조카도 함께 방문하고 추억을 올릴 수 있어서 정말 위로가 됐습니다.' },
  { initial: '박', name: '박○○ 님', role: '부산 · AI 페르소나', text: 'AI가 아버지 목소리로 메시지를 만들어줬을 때 눈물이 났어요. 아이들이 할아버지 이야기를 들을 수 있게 됐어요.' },
  { initial: '최', name: '최○○ 님', role: '대구 · 영구분양', text: '생전에 직접 영상 메시지를 녹화해 두셨고, 온기로 덕분에 그 소중한 영상들이 영원히 보존되고 있어요.' },
];

const DEMO_TABS = ['생애사', '사진첩', '영상', 'AI 대화'];

// ─── 섹션 컴포넌트 ────────────────────────────────────
function SectionEyebrow({ text }: { text: string }) {
  return <Text style={s.eyebrow}>{text}</Text>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={s.sectionTitle}>{children}</Text>;
}

// ─── 메인 ─────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const [demoTab, setDemoTab] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.deepBrown }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── HERO ── */}
        <View style={s.hero}>
          <Text style={s.heroEyebrow}>디지털 추모 공원 · 생애사 아카이브</Text>
          <Text style={s.heroTitle}>
            기억은{'\n'}영원히{' '}
            <Text style={{ color: Colors.goldLight }}>살아</Text>
            {'\n'}숨쉽니다
          </Text>
          <Text style={s.heroSubEn}>Where memories transcend time</Text>
          <Text style={s.heroDesc}>
            소중한 분의 삶을 사진, 영상, AI로 아름답게 보존하세요.{'\n'}
            가족이 함께 기억하고, 세대를 넘어 연결됩니다.
          </Text>
          <View style={s.heroActions}>
            <TouchableOpacity style={s.btnGold} onPress={() => router.push('/memorials')}>
              <Text style={s.btnGoldText}>추모 공간 만들기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnOutline} onPress={() => router.push('/memorials')}>
              <Text style={s.btnOutlineText}>미리보기</Text>
            </TouchableOpacity>
          </View>

          {/* 미리보기 카드 */}
          <View style={s.previewCard}>
            <View style={s.previewBadge}><Text style={s.previewBadgeText}>Premium</Text></View>
            <View style={s.previewAvatar}><Text style={s.previewAvatarText}>홍</Text></View>
            <Text style={s.previewName}>홍길동 님</Text>
            <Text style={s.previewDates}>1940. 03. 15 — 2024. 11. 08</Text>
            <View style={s.previewDivider} />
            <Text style={s.previewQuote}>&quot;가족을 사랑하고{'\n'}나라를 사랑한 분&quot;</Text>
            <View style={s.previewIcons}>
              {['📷', '🎬', '🤖', '📖'].map((ic) => (
                <View key={ic} style={s.previewIconBox}><Text style={{ fontSize: 20 }}>{ic}</Text></View>
              ))}
            </View>
          </View>
        </View>

        {/* ── STATS ── */}
        <View style={s.statsRow}>
          {stats.map(({ number, label }) => (
            <View key={label} style={s.statItem}>
              <Text style={s.statNum}>{number}</Text>
              <Text style={s.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* ── FEATURES ── */}
        <View style={s.section}>
          <SectionEyebrow text="서비스 소개" />
          <SectionTitle>
            단순한 추모를 넘어{'\n'}
            <Text style={{ fontWeight: '700' }}>살아있는 기억의 공간</Text>
          </SectionTitle>
          <Text style={s.sectionDesc}>
            온기로는 오프라인 추모공원과 연계된 Real+Digital 통합 플랫폼으로, 故人의 삶을 입체적으로 보존하고 공유합니다.
          </Text>
          <View style={s.featGrid}>
            {features.map(({ icon, title, desc, tag }) => (
              <View key={tag} style={s.featCard}>
                <Text style={{ fontSize: 30, marginBottom: 10 }}>{icon}</Text>
                <Text style={s.featTitle}>{title}</Text>
                <Text style={s.featDesc}>{desc}</Text>
                <View style={s.featTag}><Text style={s.featTagText}>{tag}</Text></View>
              </View>
            ))}
          </View>
        </View>

        {/* ── MEMORIAL PREVIEW ── */}
        <View style={[s.section, { backgroundColor: Colors.cream }]}>
          <SectionEyebrow text="추모 공간 미리보기" />
          <SectionTitle>
            이런 공간이{'\n'}
            <Text style={{ fontWeight: '700' }}>기다리고 있습니다</Text>
          </SectionTitle>

          {/* 데모 UI */}
          <View style={s.demoBox}>
            <View style={s.demoBrowser}>
              <View style={s.demoDots}>
                {[0,1,2].map(i => <View key={i} style={s.demoDot} />)}
              </View>
              <Text style={s.demoUrl}>ongiro.kr/memorial/KR-2024-08821</Text>
            </View>
            <View style={s.demoBody}>
              <View style={s.demoAvatar}><Text style={s.demoAvatarText}>김</Text></View>
              <Text style={s.demoName}>김영숙 님</Text>
              <Text style={s.demoDates}>1945. 05. 20 — 2024. 08. 15</Text>
              <View style={s.demoTabs}>
                {DEMO_TABS.map((tab, i) => (
                  <TouchableOpacity key={tab} onPress={() => setDemoTab(i)}
                    style={[s.demoTab, demoTab === i && s.demoTabActive]}>
                    <Text style={[s.demoTabText, demoTab === i && s.demoTabTextActive]}>{tab}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {demoTab === 0 && (
                <Text style={s.demoStory}>
                  &quot;1945년 전쟁의 상흔이 남은 시절 태어나, 어려운 환경 속에서도 꿋꿋이 세 자녀를 키워내셨습니다. 평생 가족만을 위해 헌신하셨던 어머니의 따뜻한 손길이 그립습니다...&quot;
                </Text>
              )}
              {demoTab === 1 && (
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                  {['👶', '🎓', '💍'].map(e => (
                    <View key={e} style={s.demoPhoto}><Text style={{ fontSize: 28 }}>{e}</Text></View>
                  ))}
                </View>
              )}
              {(demoTab === 2 || demoTab === 3) && (
                <View style={s.demoAiTag}>
                  <View style={s.aiDot} />
                  <Text style={s.demoAiText}>AI 페르소나 활성화됨 · 지금 대화하기 →</Text>
                </View>
              )}
            </View>
          </View>

          {/* Steps */}
          <View style={s.steps}>
            {steps.map(({ num, title, desc }) => (
              <View key={num} style={s.stepItem}>
                <Text style={s.stepNum}>{num}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.stepTitle}>{title}</Text>
                  <Text style={s.stepDesc}>{desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── AI FEATURES ── */}
        <View style={[s.section, { backgroundColor: '#2A1F15' }]}>
          <SectionEyebrow text="AI 기술" />
          <Text style={[s.sectionTitle, { color: Colors.cream }]}>
            故人과 다시{'\n'}
            <Text style={{ fontWeight: '700' }}>대화할 수 있다면</Text>
          </Text>

          {/* AI 채팅 데모 */}
          <View style={s.aiChat}>
            <View style={s.aiMsgSystem}>
              <View style={s.aiMsgLabel}>
                <View style={s.aiDot} />
                <Text style={s.aiMsgLabelText}>AI 페르소나 · 김영숙 님</Text>
              </View>
              <Text style={s.aiMsgSystemText}>
                &quot;얘야, 잘 지내고 있니? 오늘 날씨가 맑은데 산책이라도 나가렴. 엄마가 살아생전 좋아하던 그 공원 알지?&quot;
              </Text>
            </View>
            <View style={s.aiMsgUser}>
              <Text style={s.aiMsgUserText}>엄마, 보고 싶어요. 요즘 힘든 일이 있었어요.</Text>
            </View>
            <View style={s.aiMsgSystem}>
              <View style={s.aiMsgLabel}>
                <View style={s.aiDot} />
                <Text style={s.aiMsgLabelText}>AI 페르소나 · 김영숙 님</Text>
              </View>
              <Text style={s.aiMsgSystemText}>
                &quot;힘들 때일수록 가족 생각해야 해. 네 아이들한테 씩씩한 모습 보여줘야지. 엄마는 항상 네 편이야.&quot;
              </Text>
            </View>
            <TouchableOpacity style={s.aiChatBtn} onPress={() => router.push('/ai-chat')}>
              <Text style={s.aiChatBtnText}>AI 대화 체험하기 →</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 16, marginTop: 8 }}>
            {aiFeatures.map(({ icon, title, desc }) => (
              <View key={title} style={s.aiFeatureItem}>
                <Text style={{ fontSize: 28 }}>{icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.aiFeatureTitle}>{title}</Text>
                  <Text style={s.aiFeatureDesc}>{desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── PRICING ── */}
        <View style={[s.section, { backgroundColor: Colors.deepBrown }]}>
          <SectionEyebrow text="요금제" />
          <Text style={[s.sectionTitle, { color: Colors.cream }]}>
            소중한 기억에{'\n'}
            <Text style={{ fontWeight: '700' }}>맞는 플랜 선택</Text>
          </Text>
          <View style={{ gap: 12 }}>
            {plans.map(({ name, nameEn, price, period, features: pf, featured }) => (
              <View key={nameEn} style={[s.planCard, featured && s.planCardFeatured]}>
                {featured && (
                  <View style={s.planRecommend}><Text style={s.planRecommendText}>추천</Text></View>
                )}
                <View style={s.planHeader}>
                  <View>
                    <Text style={[s.planName, featured && { color: Colors.deepBrown }]}>{name}</Text>
                    <Text style={[s.planNameEn, featured && { color: 'rgba(61,43,31,0.5)' }]}>{nameEn}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[s.planPrice, featured && { color: Colors.deepBrown }]}>₩{price}</Text>
                    <Text style={[s.planPeriod, featured && { color: 'rgba(61,43,31,0.6)' }]}>{period}</Text>
                  </View>
                </View>
                <View style={[s.planDivider, featured && { backgroundColor: 'rgba(61,43,31,0.15)' }]} />
                <View style={{ gap: 8, marginBottom: 16 }}>
                  {pf.map((f) => (
                    <View key={f} style={{ flexDirection: 'row', gap: 8 }}>
                      <Text style={{ color: featured ? Colors.deepBrown : Colors.gold }}>✓</Text>
                      <Text style={[s.planFeature, featured && { color: Colors.deepBrown }]}>{f}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity style={[s.planBtn, featured && s.planBtnFeatured]}>
                  <Text style={[s.planBtnText, featured && { color: Colors.gold }]}>
                    {name === '영구분양' ? '상담 신청' : '시작하기'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* ── SECURITY ── */}
        <View style={[s.section, { backgroundColor: Colors.warmWhite }]}>
          <SectionEyebrow text="보안 & 개인정보" />
          <SectionTitle>
            가장 소중한 기억을{'\n'}
            <Text style={{ fontWeight: '700' }}>안전하게 보호합니다</Text>
          </SectionTitle>
          <View style={{ gap: 14 }}>
            {[
              { icon: '🔐', title: '군사급 암호화', desc: 'AES-256 암호화로 모든 데이터 보호. 개인별 고유 암호화 키 발급' },
              { icon: '⛓', title: '블록체인 영구 유언', desc: '변조 불가능한 디지털 유언장 생성' },
              { icon: '👤', title: '암호화 계정 분양', desc: '독립된 암호화 계정. 가족만 접근 가능' },
              { icon: '🛡', title: '개인정보 데이터3법 준수', desc: '국내 개인정보보호법 및 EU GDPR 기준 적용' },
            ].map(({ icon, title, desc }) => (
              <View key={title} style={s.secItem}>
                <Text style={{ fontSize: 28 }}>{icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.secTitle}>{title}</Text>
                  <Text style={s.secDesc}>{desc}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={s.secBadges}>
            {['AES-256', 'Blockchain', 'ISO 27001', '개보법 준수'].map(b => (
              <View key={b} style={s.secBadge}><Text style={s.secBadgeText}>{b}</Text></View>
            ))}
          </View>
        </View>

        {/* ── STORIES ── */}
        <View style={[s.section, { backgroundColor: Colors.cream }]}>
          <SectionEyebrow text="이용 후기" />
          <SectionTitle>가족의 <Text style={{ fontWeight: '700' }}>진심 어린</Text> 이야기</SectionTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -24 }}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}>
            {stories.map(({ initial, name, role, text }) => (
              <View key={name} style={s.storyCard}>
                <View style={s.storyAvatar}><Text style={s.storyAvatarText}>{initial}</Text></View>
                <Text style={s.storyText}>{text}</Text>
                <Text style={s.storyName}>{name}</Text>
                <Text style={s.storyRole}>{role}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── CTA ── */}
        <View style={[s.section, { backgroundColor: Colors.deepBrown, alignItems: 'center' }]}>
          <Text style={s.ctaEyebrow}>지금 시작하세요</Text>
          <Text style={[s.sectionTitle, { color: Colors.cream, textAlign: 'center' }]}>
            소중한 분의 기억을{'\n'}
            <Text style={{ fontWeight: '700' }}>영원히 남기세요</Text>
          </Text>
          <Text style={s.ctaDesc}>
            온기로와 함께 디지털 추모 공간을 만들어 보세요.{'\n'}연계 추모공원에 문의하시면 상세 안내를 받으실 수 있습니다.
          </Text>
          <TouchableOpacity style={s.btnGold} onPress={() => router.push('/memorials')}>
            <Text style={s.btnGoldText}>추모 공간 분양받기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btnOutline, { marginTop: 12 }]}>
            <Text style={s.btnOutlineText}>무료 상담 신청</Text>
          </TouchableOpacity>
          <Text style={s.ctaNote}>· 연계 추모공원 방문 시 현장 데모 체험 가능</Text>
        </View>

        {/* ── FOOTER ── */}
        <View style={s.footer}>
          <Text style={s.footerBrand}>Ongiro</Text>
          <Text style={s.footerTagline}>예술과 나눔을 엮어 지속 가능한 문화와 복지를 가꾸는 선한 플랫폼</Text>
          <Text style={s.footerCopy}>© 2025 Ongiro (온기로). All rights reserved.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── 스타일 ───────────────────────────────────────────
const s = StyleSheet.create({
  // HERO
  hero: { backgroundColor: Colors.deepBrown, padding: 24, paddingTop: 48, paddingBottom: 32 },
  heroEyebrow: { fontSize: 10, letterSpacing: 3, color: Colors.gold, textTransform: 'uppercase', marginBottom: 20 },
  heroTitle: { fontSize: 46, fontWeight: '200', color: Colors.cream, lineHeight: 54, marginBottom: 12 },
  heroSubEn: { fontSize: 16, fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', marginBottom: 18 },
  heroDesc: { fontSize: 13, lineHeight: 22, color: 'rgba(245,240,232,0.7)', marginBottom: 28 },
  heroActions: { flexDirection: 'row', gap: 10, marginBottom: 32 },

  // Preview card
  previewCard: {
    backgroundColor: 'rgba(245,240,232,0.06)', borderWidth: 1,
    borderColor: 'rgba(200,169,110,0.2)', borderRadius: 4, padding: 24, alignItems: 'center',
  },
  previewBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(200,169,110,0.15)', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 2 },
  previewBadgeText: { fontSize: 10, color: Colors.gold, letterSpacing: 0.5 },
  previewAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.midBrown, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  previewAvatarText: { fontSize: 26, color: Colors.cream },
  previewName: { fontSize: 18, fontWeight: '400', color: Colors.cream, marginBottom: 4 },
  previewDates: { fontSize: 11, color: 'rgba(200,169,110,0.8)', letterSpacing: 1.5, marginBottom: 14 },
  previewDivider: { width: 32, height: 1, backgroundColor: Colors.gold, opacity: 0.5, marginBottom: 14 },
  previewQuote: { fontSize: 13, fontStyle: 'italic', color: 'rgba(245,240,232,0.6)', textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  previewIcons: { flexDirection: 'row', gap: 8 },
  previewIconBox: { width: 52, height: 44, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 3, justifyContent: 'center', alignItems: 'center' },

  // STATS
  statsRow: { flexDirection: 'row', backgroundColor: Colors.cream, paddingVertical: 20, justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '600', color: Colors.deepBrown, marginBottom: 2 },
  statLabel: { fontSize: 9, color: Colors.softGray, textAlign: 'center' },

  // SECTION common
  section: { backgroundColor: Colors.warmWhite, padding: 24, paddingVertical: 40 },
  eyebrow: { fontSize: 10, letterSpacing: 3, color: Colors.gold, textTransform: 'uppercase', marginBottom: 12 },
  sectionTitle: { fontSize: 26, fontWeight: '300', color: Colors.deepBrown, lineHeight: 36, marginBottom: 12 },
  sectionDesc: { fontSize: 13, color: Colors.softGray, lineHeight: 22, marginBottom: 24 },

  // FEATURES
  featGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  featCard: { width: (width - 58) / 2, backgroundColor: Colors.white, borderRadius: 4, padding: 16, borderWidth: 1, borderColor: 'rgba(107,76,59,0.08)' },
  featTitle: { fontSize: 13, fontWeight: '600', color: Colors.deepBrown, marginBottom: 6 },
  featDesc: { fontSize: 11, color: Colors.softGray, lineHeight: 17, marginBottom: 10 },
  featTag: { backgroundColor: 'rgba(200,169,110,0.12)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 2, alignSelf: 'flex-start' },
  featTagText: { fontSize: 10, color: Colors.lightBrown },

  // MEMORIAL DEMO
  demoBox: { backgroundColor: Colors.white, borderRadius: 4, overflow: 'hidden', marginBottom: 28, borderWidth: 1, borderColor: 'rgba(107,76,59,0.1)' },
  demoBrowser: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(61,43,31,0.05)', paddingHorizontal: 12, paddingVertical: 8 },
  demoDots: { flexDirection: 'row', gap: 4 },
  demoDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(107,76,59,0.2)' },
  demoUrl: { fontSize: 10, color: Colors.softGray, flex: 1 },
  demoBody: { padding: 16, alignItems: 'center' },
  demoAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.midBrown, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  demoAvatarText: { fontSize: 22, color: Colors.cream },
  demoName: { fontSize: 18, fontWeight: '400', color: Colors.deepBrown, marginBottom: 4 },
  demoDates: { fontSize: 11, color: Colors.softGray, letterSpacing: 1, marginBottom: 12 },
  demoTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(107,76,59,0.1)', width: '100%', marginBottom: 12 },
  demoTab: { flex: 1, paddingVertical: 8, alignItems: 'center' },
  demoTabActive: { borderBottomWidth: 2, borderBottomColor: Colors.gold },
  demoTabText: { fontSize: 12, color: Colors.softGray },
  demoTabTextActive: { color: Colors.deepBrown, fontWeight: '500' },
  demoStory: { fontSize: 12, color: Colors.charcoal, lineHeight: 20, textAlign: 'center', fontStyle: 'italic' },
  demoPhoto: { width: 72, height: 56, backgroundColor: Colors.cream, borderRadius: 3, justifyContent: 'center', alignItems: 'center' },
  demoAiTag: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  demoAiText: { fontSize: 12, color: Colors.midBrown },

  // STEPS
  steps: { gap: 16 },
  stepItem: { flexDirection: 'row', gap: 16, alignItems: 'flex-start' },
  stepNum: { fontSize: 22, fontWeight: '200', color: Colors.gold, width: 36 },
  stepTitle: { fontSize: 14, fontWeight: '600', color: Colors.deepBrown, marginBottom: 4 },
  stepDesc: { fontSize: 12, color: Colors.softGray, lineHeight: 18 },

  // AI FEATURES
  aiChat: { backgroundColor: 'rgba(245,240,232,0.05)', borderRadius: 4, padding: 16, marginBottom: 24, gap: 12, borderWidth: 1, borderColor: 'rgba(200,169,110,0.15)' },
  aiMsgSystem: { backgroundColor: 'rgba(245,240,232,0.08)', borderRadius: 4, padding: 14 },
  aiMsgLabel: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  aiDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.sage },
  aiMsgLabelText: { fontSize: 10, color: Colors.softGray },
  aiMsgSystemText: { fontSize: 13, color: 'rgba(245,240,232,0.8)', lineHeight: 20, fontStyle: 'italic' },
  aiMsgUser: { backgroundColor: Colors.gold, borderRadius: 4, padding: 14, alignSelf: 'flex-end', maxWidth: '80%' },
  aiMsgUserText: { fontSize: 13, color: Colors.deepBrown },
  aiChatBtn: { alignItems: 'center', paddingVertical: 10 },
  aiChatBtnText: { fontSize: 13, color: Colors.gold, letterSpacing: 0.5 },
  aiFeatureItem: { flexDirection: 'row', gap: 14, backgroundColor: 'rgba(245,240,232,0.05)', padding: 14, borderRadius: 4 },
  aiFeatureTitle: { fontSize: 14, fontWeight: '600', color: Colors.cream, marginBottom: 4 },
  aiFeatureDesc: { fontSize: 12, color: 'rgba(245,240,232,0.5)', lineHeight: 18 },

  // PRICING
  planCard: { backgroundColor: 'rgba(245,240,232,0.05)', borderWidth: 1, borderColor: 'rgba(245,240,232,0.1)', borderRadius: 4, padding: 20 },
  planCardFeatured: { backgroundColor: Colors.gold, borderWidth: 0 },
  planRecommend: { backgroundColor: Colors.deepBrown, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 12 },
  planRecommendText: { fontSize: 10, color: Colors.gold },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  planName: { fontSize: 18, fontWeight: '400', color: Colors.cream },
  planNameEn: { fontSize: 10, letterSpacing: 2, color: Colors.softGray, marginTop: 2 },
  planPrice: { fontSize: 24, fontWeight: '600', color: Colors.cream },
  planPeriod: { fontSize: 11, color: Colors.softGray },
  planDivider: { height: 1, backgroundColor: 'rgba(245,240,232,0.1)', marginBottom: 14 },
  planFeature: { fontSize: 13, color: 'rgba(245,240,232,0.7)', flex: 1 },
  planBtn: { borderWidth: 1, borderColor: 'rgba(245,240,232,0.3)', paddingVertical: 12, borderRadius: 2, alignItems: 'center' },
  planBtnFeatured: { backgroundColor: Colors.deepBrown, borderWidth: 0 },
  planBtnText: { fontSize: 13, color: Colors.cream, fontWeight: '500', letterSpacing: 0.5 },

  // SECURITY
  secItem: { flexDirection: 'row', gap: 14, padding: 14, backgroundColor: Colors.white, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(107,76,59,0.08)' },
  secTitle: { fontSize: 14, fontWeight: '600', color: Colors.deepBrown, marginBottom: 4 },
  secDesc: { fontSize: 12, color: Colors.softGray, lineHeight: 18 },
  secBadges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 20 },
  secBadge: { backgroundColor: 'rgba(107,76,59,0.08)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 2 },
  secBadgeText: { fontSize: 11, color: Colors.midBrown, fontWeight: '500' },

  // STORIES
  storyCard: { width: width * 0.72, backgroundColor: Colors.white, borderRadius: 4, padding: 20, borderWidth: 1, borderColor: 'rgba(107,76,59,0.08)' },
  storyAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.midBrown, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  storyAvatarText: { fontSize: 18, color: Colors.cream },
  storyText: { fontSize: 13, color: Colors.charcoal, lineHeight: 20, marginBottom: 14, fontStyle: 'italic' },
  storyName: { fontSize: 13, fontWeight: '600', color: Colors.deepBrown },
  storyRole: { fontSize: 11, color: Colors.softGray, marginTop: 2 },

  // CTA
  ctaEyebrow: { fontSize: 10, letterSpacing: 3, color: Colors.gold, textTransform: 'uppercase', marginBottom: 16 },
  ctaDesc: { fontSize: 13, color: 'rgba(245,240,232,0.6)', lineHeight: 22, textAlign: 'center', marginBottom: 28 },
  ctaNote: { fontSize: 11, color: 'rgba(245,240,232,0.3)', marginTop: 20, textAlign: 'center' },

  // FOOTER
  footer: { backgroundColor: '#1A1008', padding: 28, alignItems: 'center' },
  footerBrand: { fontSize: 22, fontWeight: '400', color: Colors.cream, marginBottom: 8 },
  footerTagline: { fontSize: 12, color: Colors.softGray, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  footerCopy: { fontSize: 11, color: 'rgba(138,138,138,0.5)' },

  // BUTTONS
  btnGold: { flex: 1, backgroundColor: Colors.gold, paddingVertical: 15, alignItems: 'center', borderRadius: 2 },
  btnGoldText: { color: Colors.deepBrown, fontSize: 13, fontWeight: '500', letterSpacing: 0.8 },
  btnOutline: { flex: 1, borderWidth: 1, borderColor: 'rgba(245,240,232,0.3)', paddingVertical: 15, alignItems: 'center', borderRadius: 2 },
  btnOutlineText: { color: Colors.cream, fontSize: 13, letterSpacing: 0.8 },
});
