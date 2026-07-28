# 온기로 (Ongiro)

> 기억을 잇는 디지털 추모 공원

오프라인 추모공원과 연계된 Real+Digital 통합 플랫폼. 故人의 삶을 사진, 영상, AI로 보존하고 가족이 함께 기억합니다.

## 프로젝트 구조

```
ongiro/
├── ongiro-app/       # 웹 (Next.js 15 + TypeScript + Tailwind)
├── ongiro-mobile/    # 모바일 (React Native + Expo)
└── ongiro.html       # 원본 랜딩페이지 프로토타입
```

## 핵심 기능

- 디지털 추모 공간 개인 분양 (납골당 1:1 연계)
- 생애사 사진·영상 아카이브
- AI 고인 페르소나 (음성 복원 + 대화형 AI)
- 가족 공유 커뮤니티
- 기일 알림 서비스

## 요금제

| 플랜 | 가격 |
|------|------|
| 기본 (Standard) | ₩9,900/월 |
| 프리미엄 (Premium) | ₩19,900/월 |
| 영구분양 (Lifetime) | ₩500만 일시납 |

## 실행 방법

### 웹
```bash
cd ongiro-app
npm install
npm run dev
```

### 모바일
```bash
cd ongiro-mobile
npm install
npx expo start
```
