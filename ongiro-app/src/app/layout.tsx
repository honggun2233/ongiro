import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR, Playfair_Display } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans",
});

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-noto-serif",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "온기로 (Ongiro) — 기억을 잇는 디지털 추모 공원",
  description: "오프라인 추모공원과 연계된 Real+Digital 통합 플랫폼. 故人의 삶을 입체적으로 보존하고 공유합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${notoSans.variable} ${notoSerif.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
