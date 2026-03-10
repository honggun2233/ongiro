import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

const stats = [
  { number: '7.7조', label: '상조 시장 규모' },
  { number: '45%', label: '50세+ 인구' },
  { number: '110%', label: '화장률 증가' },
];

const features = [
  { icon: '🌸', title: '디지털 추모 공간', desc: '납골당과 1:1 연계된 디지털 트윈 서비스' },
  { icon: '📸', title: '생애사 아카이브', desc: '사진·영상을 타임라인으로 영구 보존' },
  { icon: '🤖', title: 'AI 페르소나', desc: '故人의 목소리와 어투를 담은 AI 대화' },
  { icon: '👨‍👩‍👧‍👦', title: '가족 공유', desc: '프라이빗 가족 공간에서 함께 추모' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>디지털 추모 공원 · 생애사 아카이브</Text>
          <Text style={styles.heroTitle}>기억은{'\n'}영원히 <Text style={styles.heroTitleAccent}>살아</Text>{'\n'}숨쉽니다</Text>
          <Text style={styles.heroSubtitle}>Where memories transcend time</Text>
          <Text style={styles.heroDesc}>
            소중한 분의 삶을 사진, 영상, AI로 아름답게 보존하세요.
            가족이 함께 기억하고, 세대를 넘어 연결됩니다.
          </Text>
          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/memorials')}>
              <Text style={styles.btnPrimaryText}>추모 공간 만들기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutline} onPress={() => router.push('/memorials')}>
              <Text style={styles.btnOutlineText}>미리보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsBar}>
          {stats.map(({ number, label }) => (
            <View key={label} style={styles.statItem}>
              <Text style={styles.statNumber}>{number}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>서비스 소개</Text>
          <Text style={styles.sectionTitle}>단순한 추모를 넘어{'\n'}<Text style={styles.sectionTitleBold}>살아있는 기억의 공간</Text></Text>
          <View style={styles.featuresGrid}>
            {features.map(({ icon, title, desc }) => (
              <View key={title} style={styles.featureCard}>
                <Text style={styles.featureIcon}>{icon}</Text>
                <Text style={styles.featureTitle}>{title}</Text>
                <Text style={styles.featureDesc}>{desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>소중한 분의 기억을{'\n'}<Text style={styles.ctaTitleBold}>영원히 남기세요</Text></Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/memorials')}>
            <Text style={styles.ctaBtnText}>추모 공간 분양받기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.deepBrown },

  // Hero
  hero: { padding: 28, paddingTop: 40, backgroundColor: Colors.deepBrown, minHeight: 480, justifyContent: 'center' },
  eyebrow: { fontSize: 10, letterSpacing: 3, color: Colors.gold, textTransform: 'uppercase', marginBottom: 20 },
  heroTitle: { fontSize: 44, fontWeight: '200', color: Colors.cream, lineHeight: 52, marginBottom: 12 },
  heroTitleAccent: { color: Colors.goldLight },
  heroSubtitle: { fontSize: 16, fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', marginBottom: 20 },
  heroDesc: { fontSize: 14, lineHeight: 24, color: 'rgba(245,240,232,0.7)', marginBottom: 32 },
  heroActions: { flexDirection: 'row', gap: 12 },
  btnPrimary: { flex: 1, backgroundColor: Colors.gold, paddingVertical: 16, alignItems: 'center', borderRadius: 2 },
  btnPrimaryText: { color: Colors.deepBrown, fontSize: 13, fontWeight: '500', letterSpacing: 1 },
  btnOutline: { flex: 1, borderWidth: 1, borderColor: 'rgba(245,240,232,0.3)', paddingVertical: 16, alignItems: 'center', borderRadius: 2 },
  btnOutlineText: { color: Colors.cream, fontSize: 13, letterSpacing: 1 },

  // Stats
  statsBar: { flexDirection: 'row', backgroundColor: Colors.cream, paddingVertical: 24, paddingHorizontal: 16, justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: '600', color: Colors.deepBrown, marginBottom: 4 },
  statLabel: { fontSize: 10, color: Colors.softGray, textAlign: 'center' },

  // Features
  section: { backgroundColor: Colors.warmWhite, padding: 28, paddingVertical: 40 },
  sectionEyebrow: { fontSize: 10, letterSpacing: 3, color: Colors.gold, textTransform: 'uppercase', marginBottom: 14 },
  sectionTitle: { fontSize: 26, fontWeight: '300', color: Colors.deepBrown, lineHeight: 36, marginBottom: 28 },
  sectionTitleBold: { fontWeight: '600' },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  featureCard: {
    width: (width - 68) / 2,
    backgroundColor: Colors.white,
    borderRadius: 4,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(107,76,59,0.08)',
  },
  featureIcon: { fontSize: 28, marginBottom: 10 },
  featureTitle: { fontSize: 13, fontWeight: '600', color: Colors.deepBrown, marginBottom: 6 },
  featureDesc: { fontSize: 12, color: Colors.softGray, lineHeight: 18 },

  // CTA
  cta: { backgroundColor: Colors.deepBrown, padding: 40, alignItems: 'center' },
  ctaTitle: { fontSize: 24, fontWeight: '300', color: Colors.cream, textAlign: 'center', lineHeight: 34, marginBottom: 28 },
  ctaTitleBold: { fontWeight: '600' },
  ctaBtn: { backgroundColor: Colors.gold, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 2 },
  ctaBtnText: { color: Colors.deepBrown, fontSize: 14, fontWeight: '500', letterSpacing: 1 },
});
