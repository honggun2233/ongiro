import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';

const TABS = ['생애사', '사진첩', '영상', 'AI 대화'];

const memorialData: Record<string, { name: string; initial: string; birth: string; death: string; quote: string; story: string }> = {
  '1': { name: '홍길동', initial: '홍', birth: '1940. 03. 15', death: '2024. 11. 08', quote: '가족을 사랑하고 나라를 사랑한 분', story: '1940년 봄, 어렵고 혼란스러운 시절에 태어나셨지만 언제나 가족을 위해 헌신하셨습니다. 세 자녀를 훌륭히 키워내시고, 평생 성실함과 나눔의 정신으로 이웃을 도우셨습니다...' },
  '2': { name: '김영숙', initial: '김', birth: '1945. 05. 20', death: '2024. 08. 15', quote: '평생 가족만을 위해 헌신하셨습니다', story: '1945년 전쟁의 상흔이 남은 시절 태어나, 어려운 환경 속에서도 꿋꿋이 세 자녀를 키워내셨습니다. 평생 가족만을 위해 헌신하셨던 어머니의 따뜻한 손길이 그립습니다...' },
};

export default function MemorialDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const data = memorialData[id ?? '1'];

  if (!data) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{data.initial}</Text>
        </View>
        <Text style={styles.name}>{data.name} 님</Text>
        <Text style={styles.dates}>{data.birth} — {data.death}</Text>
        <View style={styles.divider} />
        <Text style={styles.quote}>&quot;{data.quote}&quot;</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === i && styles.tabActive]} onPress={() => setActiveTab(i)}>
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab content */}
      <View style={styles.content}>
        {activeTab === 0 && (
          <View>
            <Text style={styles.storyText}>{data.story}</Text>
            <View style={styles.timeline}>
              {[{ year: '출생', desc: '1945년 경상남도 출생' }, { year: '결혼', desc: '1968년 김○○씨와 결혼' }, { year: '자녀', desc: '3남매 출산 및 양육' }, { year: '별세', desc: '2024년 가족의 곁에서 영면' }].map(({ year, desc }) => (
                <View key={year} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View>
                    <Text style={styles.timelineYear}>{year}</Text>
                    <Text style={styles.timelineDesc}>{desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        {activeTab === 1 && (
          <View style={styles.photoGrid}>
            {['👶', '🎓', '💍', '👨‍👩‍👧‍👦', '🌸', '🕯️'].map((emoji, i) => (
              <View key={i} style={styles.photoThumb}>
                <Text style={styles.photoEmoji}>{emoji}</Text>
              </View>
            ))}
          </View>
        )}
        {activeTab === 2 && (
          <View style={styles.emptyTab}>
            <Text style={styles.emptyTabIcon}>🎬</Text>
            <Text style={styles.emptyTabText}>등록된 영상이 없습니다</Text>
          </View>
        )}
        {activeTab === 3 && (
          <View style={styles.aiTab}>
            <View style={styles.aiInfo}>
              <View style={styles.aiDot} />
              <Text style={styles.aiInfoText}>AI 페르소나가 활성화되어 있습니다</Text>
            </View>
            <TouchableOpacity style={styles.aiChatBtn} onPress={() => router.push('/ai-chat')}>
              <Text style={styles.aiChatBtnText}>대화 시작하기</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.warmWhite },
  profileSection: { backgroundColor: Colors.deepBrown, alignItems: 'center', padding: 32 },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.midBrown, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 36, color: Colors.cream },
  name: { fontSize: 24, fontWeight: '300', color: Colors.cream, marginBottom: 6 },
  dates: { fontSize: 12, color: 'rgba(200,169,110,0.8)', letterSpacing: 1.5, marginBottom: 16 },
  divider: { width: 40, height: 1, backgroundColor: Colors.gold, opacity: 0.5, marginBottom: 16 },
  quote: { fontSize: 14, fontStyle: 'italic', color: 'rgba(245,240,232,0.6)', textAlign: 'center', lineHeight: 22 },

  tabs: { flexDirection: 'row', backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: 'rgba(107,76,59,0.1)' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.gold },
  tabText: { fontSize: 13, color: Colors.softGray },
  tabTextActive: { color: Colors.deepBrown, fontWeight: '500' },

  content: { padding: 20 },

  storyText: { fontSize: 14, color: Colors.charcoal, lineHeight: 24, marginBottom: 24 },
  timeline: { gap: 16 },
  timelineItem: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.gold, marginTop: 4 },
  timelineYear: { fontSize: 12, fontWeight: '600', color: Colors.deepBrown, marginBottom: 2 },
  timelineDesc: { fontSize: 13, color: Colors.softGray },

  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  photoThumb: { width: 100, height: 100, backgroundColor: Colors.cream, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  photoEmoji: { fontSize: 36 },

  emptyTab: { alignItems: 'center', paddingVertical: 60 },
  emptyTabIcon: { fontSize: 48, marginBottom: 12 },
  emptyTabText: { fontSize: 14, color: Colors.softGray },

  aiTab: { alignItems: 'center', paddingVertical: 40, gap: 20 },
  aiInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  aiDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.sage },
  aiInfoText: { fontSize: 14, color: Colors.charcoal },
  aiChatBtn: { backgroundColor: Colors.deepBrown, paddingVertical: 14, paddingHorizontal: 36, borderRadius: 4 },
  aiChatBtnText: { color: Colors.cream, fontSize: 14, fontWeight: '500' },
});
