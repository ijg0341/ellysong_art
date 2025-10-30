import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nanum-myeongjo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: "Elly Song - Artist Portfolio",
  description: "송엘리(Elly Song) 작가의 포트폴리오. 산티아고 순례길 1,400km 도보 여행의 경험을 바탕으로, 비단 위에 전통 채색화 기법을 사용해 다양한 기후와 환경 속 '길 위의 풍경'을 작업합니다.",
  keywords: ["송엘리", "Elly Song", "전통 채색화", "비단", "산티아고 순례길", "진채화", "한국화", "현대 채색화", "artist portfolio", "Korean traditional painting", "Camino de Santiago"],
  authors: [{ name: "Elly Song" }],
  creator: "Elly Song",
  publisher: "Elly Song",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Elly Song - Artist Portfolio",
    description: "산티아고 순례길의 경험을 비단 위에 전통 채색화로 담아내는 송엘리 작가",
    type: "website",
    locale: "ko_KR",
    url: '/',
    siteName: "Elly Song Portfolio",
    images: [
      {
        url: '/images/hero_poster_kor.jpeg',
        width: 1200,
        height: 630,
        alt: 'Elly Song 작가 대표 작품',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Elly Song - Artist Portfolio",
    description: "산티아고 순례길의 경험을 비단 위에 전통 채색화로 담아내는 송엘리 작가",
    images: ['/images/hero_poster_kor.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
