# CLAUDE.md — 온기로 (Ongiro)

디지털 추모공원 플랫폼. 개인 프로젝트, 대표 홍인표.

## 프로젝트 구조

```
ongiro 프로젝트/
├── ongiro-app/       # Next.js 웹앱
└── ongiro-mobile/    # React Native 모바일앱
```

## 스택

| 영역 | 기술 |
|------|------|
| 웹앱 | Next.js 15, TypeScript, Tailwind CSS |
| 모바일 | React Native, Expo |

## 실행 방법

```bash
# 웹앱 (포트 3000)
cd ongiro-app
npm run dev

# 모바일
cd ongiro-mobile
npx expo start
```

## 주요 기능

- 디지털 추모공간 분양
- 사진·영상 아카이브
- AI 고인 페르소나
- 가족 커뮤니티
- 결제 연동

## 금지사항

- **실제 고인 데이터를 외부 API로 전송하지 않는다.** 개인정보 보호 최우선.
- **개인정보를 로컬 외 저장하지 않는다.** 클라우드 저장 시 반드시 암호화 확인 후 진행.

## 현재 상태 / 미구현

- 납골당 업체 연계 예정 — 아직 미연결
- AI 페르소나 음성복원 미구현 단계
