import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

type Message = { id: string; from: 'ai' | 'user'; text: string };

const initialMessages: Message[] = [
  { id: '1', from: 'ai', text: '얘야, 잘 지내고 있니? 오늘 날씨가 맑은데 산책이라도 나가렴. 엄마가 살아생전 좋아하던 그 공원 알지?' },
];

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // 임시 AI 응답
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        from: 'ai',
        text: '힘들 때일수록 가족 생각해야 해. 네 아이들한테 씩씩한 모습 보여줘야지. 엄마는 항상 네 편이야.',
      };
      setMessages((prev) => [...prev, aiMsg]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 1000);

    scrollRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.avatar}><Text style={styles.avatarText}>김</Text></View>
          <View>
            <Text style={styles.personName}>김영숙 님</Text>
            <View style={styles.aiStatus}>
              <View style={styles.aiDot} />
              <Text style={styles.aiStatusText}>AI 페르소나 활성화됨</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView ref={scrollRef} style={styles.messages} contentContainerStyle={{ padding: 16, gap: 12 }}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.msgRow, msg.from === 'user' && styles.msgRowUser]}>
            {msg.from === 'ai' && <View style={styles.msgAvatar}><Text style={styles.msgAvatarText}>김</Text></View>}
            <View style={[styles.bubble, msg.from === 'ai' ? styles.bubbleAi : styles.bubbleUser]}>
              {msg.from === 'ai' && (
                <View style={styles.aiLabel}>
                  <View style={styles.aiDot} />
                  <Text style={styles.aiLabelText}>AI · 김영숙 님</Text>
                </View>
              )}
              <Text style={[styles.bubbleText, msg.from === 'user' && styles.bubbleTextUser]}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="메시지를 입력하세요..."
            placeholderTextColor={Colors.softGray}
            multiline
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendBtnText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.warmWhite },
  header: {
    backgroundColor: Colors.deepBrown, padding: 16,
    flexDirection: 'row', alignItems: 'center',
  },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.midBrown, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, color: Colors.cream },
  personName: { fontSize: 16, fontWeight: '500', color: Colors.cream },
  aiStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  aiDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.sage },
  aiStatusText: { fontSize: 11, color: 'rgba(245,240,232,0.6)' },

  messages: { flex: 1 },

  msgRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  msgRowUser: { justifyContent: 'flex-end' },
  msgAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.midBrown, justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  msgAvatarText: { fontSize: 13, color: Colors.cream },

  bubble: { maxWidth: '75%', padding: 14, borderRadius: 4 },
  bubbleAi: { backgroundColor: Colors.white, borderWidth: 1, borderColor: 'rgba(107,76,59,0.1)' },
  bubbleUser: { backgroundColor: Colors.deepBrown },
  aiLabel: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 6 },
  aiLabelText: { fontSize: 10, color: Colors.softGray, letterSpacing: 0.5 },
  bubbleText: { fontSize: 14, color: Colors.charcoal, lineHeight: 22 },
  bubbleTextUser: { color: Colors.cream },

  inputRow: {
    flexDirection: 'row', gap: 8, padding: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: 'rgba(107,76,59,0.1)',
  },
  input: {
    flex: 1, backgroundColor: Colors.warmWhite, borderRadius: 4,
    paddingHorizontal: 14, paddingVertical: 10, fontSize: 14,
    color: Colors.charcoal, maxHeight: 100,
    borderWidth: 1, borderColor: 'rgba(107,76,59,0.15)',
  },
  sendBtn: { backgroundColor: Colors.gold, paddingHorizontal: 18, borderRadius: 4, justifyContent: 'center' },
  sendBtnText: { color: Colors.deepBrown, fontWeight: '500', fontSize: 14 },
});
