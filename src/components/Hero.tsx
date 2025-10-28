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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 3000)

    return () => clearInterval(autoplay)
  }, [emblaApi])

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
            </div>
          </motion.div>

          {/* 오른쪽 캐러셀 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full"
          >
            <div className="embla relative group">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {carouselImages.map((image, index) => (
                    <div className="embla__slide flex-[0_0_100%]" key={index}>
                      <div className="relative w-full aspect-[9/16] md:aspect-[3/4]">
                        <Image
                          src={image}
                          alt={`Hero image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 이전/다음 버튼 */}
              <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}