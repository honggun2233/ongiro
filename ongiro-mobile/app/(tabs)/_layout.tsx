import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color, size }: { name: IoniconsName; color: string; size: number }) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.deepBrown,
          borderTopColor: 'rgba(200,169,110,0.2)',
          height: 80,
          paddingBottom: 16,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: 'rgba(245,240,232,0.4)',
        tabBarLabelStyle: {
          fontSize: 10,
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <TabIcon name="home-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="memorials"
        options={{
          title: '추모 공간',
          tabBarIcon: ({ color, size }) => <TabIcon name="flower-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="ai-chat"
        options={{
          title: 'AI 대화',
          tabBarIcon: ({ color, size }) => <TabIcon name="chatbubble-ellipses-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '내 정보',
          tabBarIcon: ({ color, size }) => <TabIcon name="person-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
