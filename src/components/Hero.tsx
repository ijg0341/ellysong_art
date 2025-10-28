'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './hero.css'

const carouselImages = [
  '/images/hero_poster_kor.jpeg',
  '/images/gallery/1.jpg',
  '/images/gallery/2.jpg',
  '/images/gallery/3.jpg',
  '/images/gallery/4.jpg',
  '/images/gallery/5.jpg',
  '/images/gallery/6.jpg',
  '/images/gallery/7.jpg',
  '/images/gallery/8.jpg',
  '/images/gallery/9..jpg',
  '/images/gallery/10.jpeg',
  '/images/gallery/11 .jpg',
  '/images/gallery/12.jpg',
  '/images/gallery/15.jpg',
  '/images/gallery/16.jpg',
]

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* 왼쪽 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2"
          >
            <div className="space-y-3">
              <p className="text-xl md:text-2xl tracking-wider font-pyeongchang-regular text-gray-700 font-semibold">송엘리 개인전</p>
              <h1 className="text-6xl md:text-8xl text-gray-700 tracking-wide font-pyeongchang leading-tight">
                뜻밖의 여정
              </h1>
            </div>
            <div className="font-pyeongchang-regular text-gray-600">
              <p className="text-2xl md:text-3xl tracking-wide text-gray-700">An Unexpected Journey</p>
              <p className="text-xl md:text-2xl font-medium text-gray-700 mt-3">2025.11.12 ~ 11.17</p>
              <a
                href="https://map.kakao.com/link/search/서울시 종로구 율곡로3길 17 2층"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 mt-8 hover:opacity-70 transition-opacity cursor-pointer group w-fit"
              >
                <div>
                  <p className="text-lg md:text-xl font-bold text-gray-800">57th 갤러리</p>
                  <p className="text-sm md:text-base text-gray-600 mt-1">서울시 종로구 율곡로3길 17 2층</p>
                </div>
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:translate-x-1 transition-transform flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* 전시 설명 */}
              <div className="mt-10 space-y-4 text-gray-700 leading-relaxed">
                <p className="text-sm md:text-base">
                  생명력의 고갈을 경험한 후, '살아가게 하는 힘', 즉 생명력에 집중하게 되었습니다.
                </p>
                <p className="text-sm md:text-base">
                  이후 생명력을 탐구하는 여정으로, 프랑스에서 출발해 스페인 내륙을 거쳐 북대서양까지 이어지는 산티아고 순례길 1,400km를 걸으며, 다양한 풍토와 기후, 길 위의 계절 변화를 직접 경험하며 풍경에 대한 감각적 인식을 형성했습니다.
                </p>
                <p className="text-sm md:text-base">
                  순례길에서 마주한 길 위의 풍경과 심상을 전통 채색화 기법으로 비단 위에 구현하였으며, 이번 전시는 그러한 창작 여정을 선보이는 자리입니다.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 오른쪽 포스터 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full"
          >
            <div className="relative w-full aspect-[9/16] md:aspect-[3/4]">
              <Image
                src={carouselImages[0]}
                alt="전시 포스터"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}