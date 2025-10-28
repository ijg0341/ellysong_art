import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";
import "./globals.css";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nanum-myeongjo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Song Eli - Artist Portfolio",
  description: "송엘리 작가의 포트폴리오. 비단에 채색하는 전통 기법으로 일상의 순간들과 여행의 풍경을 담아냅니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${nanumMyeongjo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
