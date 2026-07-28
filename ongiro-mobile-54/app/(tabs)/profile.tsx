import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

const menuItems = [
  { icon: 'flower-outline', label: '내 추모 공간 관리' },
  { icon: 'people-outline', label: '가족 초대 관리' },
  { icon: 'notifications-outline', label: '기일 알림 설정' },
  { icon: 'card-outline', label: '요금제 관리' },
  { icon: 'shield-checkmark-outline', label: '보안 & 개인정보' },
  { icon: 'help-circle-outline', label: '고객센터' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 정보</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>홍</Text>
          </View>
          <Text style={styles.userName}>홍길동 님</Text>
          <Text style={styles.userEmail}>hong@example.com</Text>
          <View style={styles.planTag}>
            <Text style={styles.planTagText}>Premium 이용 중</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          {menuItems.map(({ icon, label }) => (
            <TouchableOpacity key={label} style={styles.menuItem}>
              <Ionicons name={icon as React.ComponentProps<typeof Ionicons>['name']} size={20} color={Colors.midBrown} />
              <Text style={styles.menuLabel}>{label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.softGray} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>

        <Text style={styles.version}>온기로 v1.0.0 · © 2025 Ongiro</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.warmWhite },
  header: { backgroundColor: Colors.deepBrown, padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: '300', color: Colors.cream, letterSpacing: 1 },

  profileCard: { backgroundColor: Colors.deepBrown, alignItems: 'center', paddingVertical: 36, paddingBottom: 40 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.midBrown, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  avatarText: { fontSize: 32, color: Colors.cream },
  userName: { fontSize: 22, fontWeight: '300', color: Colors.cream, marginBottom: 4 },
  userEmail: { fontSize: 13, color: 'rgba(245,240,232,0.5)', marginBottom: 12 },
  planTag: { backgroundColor: 'rgba(200,169,110,0.2)', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20 },
  planTagText: { fontSize: 12, color: Colors.gold, letterSpacing: 0.5 },

  menuSection: { backgroundColor: Colors.white, marginTop: 16, marginHorizontal: 16, borderRadius: 8, overflow: 'hidden' },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(107,76,59,0.06)',
  },
  menuLabel: { flex: 1, fontSize: 15, color: Colors.charcoal },

  logoutBtn: { margin: 16, marginTop: 24, padding: 16, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(107,76,59,0.2)', alignItems: 'center' },
  logoutText: { fontSize: 14, color: Colors.softGray },

  version: { textAlign: 'center', fontSize: 11, color: Colors.softGray, marginBottom: 32 },
});
