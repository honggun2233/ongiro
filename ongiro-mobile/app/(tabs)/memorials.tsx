import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';

const sampleMemorials = [
  { id: '1', name: '홍길동 님', dates: '1940. 03. 15 — 2024. 11. 08', initial: '홍', plan: 'Premium', quote: '가족을 사랑하고 나라를 사랑한 분' },
  { id: '2', name: '김영숙 님', dates: '1945. 05. 20 — 2024. 08. 15', initial: '김', plan: 'Standard', quote: '평생 가족만을 위해 헌신하셨습니다' },
];

export default function MemorialsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>추모 공간</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ 새 추모 공간</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {sampleMemorials.map((memorial) => (
          <TouchableOpacity
            key={memorial.id}
            style={styles.card}
            onPress={() => router.push(`/memorial/${memorial.id}`)}
          >
            <View style={styles.cardLeft}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{memorial.initial}</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                <Text style={styles.cardName}>{memorial.name}</Text>
                <View style={[styles.planBadge, memorial.plan === 'Premium' && styles.planBadgePremium]}>
                  <Text style={styles.planBadgeText}>{memorial.plan}</Text>
                </View>
              </View>
              <Text style={styles.cardDates}>{memorial.dates}</Text>
              <Text style={styles.cardQuote} numberOfLines={1}>&quot;{memorial.quote}&quot;</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty state placeholder */}
        <View style={styles.emptyHint}>
          <Text style={styles.emptyHintText}>추모 공간을 분양받으시면{'\n'}여기에 나타납니다</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.warmWhite },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: Colors.deepBrown,
  },
  headerTitle: { fontSize: 20, fontWeight: '300', color: Colors.cream, letterSpacing: 1 },
  addBtn: { backgroundColor: Colors.gold, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 2 },
  addBtnText: { fontSize: 12, color: Colors.deepBrown, fontWeight: '500' },

  list: { flex: 1, padding: 16 },

  card: {
    flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 4,
    marginBottom: 12, padding: 16, gap: 14,
    borderWidth: 1, borderColor: 'rgba(107,76,59,0.08)',
    shadowColor: Colors.deepBrown, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  cardLeft: { justifyContent: 'center' },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.midBrown,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 22, color: Colors.cream },
  cardBody: { flex: 1 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardName: { fontSize: 16, fontWeight: '500', color: Colors.deepBrown },
  planBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 2, backgroundColor: 'rgba(107,76,59,0.1)' },
  planBadgePremium: { backgroundColor: 'rgba(200,169,110,0.15)' },
  planBadgeText: { fontSize: 10, color: Colors.lightBrown, letterSpacing: 0.5 },
  cardDates: { fontSize: 11, color: Colors.softGray, marginBottom: 4, letterSpacing: 0.5 },
  cardQuote: { fontSize: 12, color: Colors.midBrown, fontStyle: 'italic' },

  emptyHint: { alignItems: 'center', paddingVertical: 40 },
  emptyHintText: { fontSize: 13, color: Colors.softGray, textAlign: 'center', lineHeight: 22 },
});
