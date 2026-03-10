import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="memorial/[id]"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#3D2B1F' },
            headerTintColor: '#F5F0E8',
            headerTitle: '추모 공간',
            headerBackTitle: '뒤로',
          }}
        />
      </Stack>
    </>
  );
}
