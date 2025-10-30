'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Artwork } from '@/types/artwork'

interface ArtworkModalProps {
  artwork: Artwork | null
  onClose: () => void
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 슬라이드 방향
  const [isFullscreenView, setIsFullscreenView] = useState(false)

  // 이미지 배열: 항상 imagePath를 첫 번째로, images 배열이 있으면 그 다음에 추가
  const images = artwork
    ? (artwork.images && artwork.images.length > 0
        ? [artwork.imagePath, ...artwork.images]
        : [artwork.imagePath])
    : []
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    // 모달이 열릴 때 인덱스 초기화
    setCurrentImageIndex(0)
    setDirection(0)
    setIsFullscreenView(false)
  }, [artwork])

  const handleNextImage = useCallback(() => {
    setDirection(1)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrevImage = useCallback(() => {
    setDirection(-1)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const handleThumbnailClick = useCallback((index: number) => {
    setDirection(index > currentImageIndex ? 1 : -1)
    setCurrentImageIndex(index)
  }, [currentImageIndex])

  const handleImageClick = useCallback(() => {
    setIsFullscreenView(true)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreenView) {
          setIsFullscreenView(false)
        } else {
          onClose()
        }
      }
    }

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage()
      } else if (e.key === 'ArrowRight') {
        handleNextImage()
      }
    }

    if (artwork) {
      document.addEventListener('keydown', handleEscape)
      if (hasMultipleImages) {
        document.addEventListener('keydown', handleArrowKeys)
      }

      // 모바일을 포함한 모든 디바이스에서 body 스크롤 방지
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('keydown', handleArrowKeys)

        // body 스크롤 복원
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [artwork, onClose, hasMultipleImages, handleNextImage, handlePrevImage, isFullscreenView])

  // 슬라이드 애니메이션 variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  }

  if (!artwork) return null

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-black/80 backdrop-blur-sm"
        >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full h-full md:w-[90vw] md:max-w-6xl md:h-[90vh] bg-white shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white transition-colors rounded-full shadow-lg"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
            <div className="relative md:flex-1 md:flex-[2] min-h-[50vh] md:h-full bg-gray-50 flex-shrink-0 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="relative md:absolute md:inset-0 w-full h-full cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={artwork.titleKo}
                    fill
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className="object-contain p-2 md:p-4"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {hasMultipleImages && (
                <>
                  {/* 이전 버튼 */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white transition-colors rounded-full shadow-lg z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* 다음 버튼 */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white transition-colors rounded-full shadow-lg z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* 이미지 카운터 */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 md:p-10 md:w-[360px] md:h-full bg-white flex flex-col md:overflow-y-auto">
              <div className="flex-1 flex flex-col md:justify-center">
                <h2 className="text-lg md:text-2xl font-light tracking-wide mb-1 md:mb-2">{artwork.titleKo}</h2>
                <p className="text-sm md:text-base text-gray-500 font-light mb-4 md:mb-8 italic">{artwork.titleEn}</p>

                <div className="space-y-3 md:space-y-6 text-gray-600 text-sm md:text-base">
                  <div className="border-b border-gray-100 pb-2 md:pb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">재료</span>
                    <p className="mt-1 md:mt-2 font-light">{artwork.material}</p>
                  </div>

                  <div className="border-b border-gray-100 pb-2 md:pb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">크기</span>
                    <p className="mt-1 md:mt-2 font-light">{artwork.dimensions}</p>
                  </div>

                  <div className="border-b border-gray-100 pb-2 md:pb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">제작년도</span>
                    <p className="mt-1 md:mt-2 font-light">{artwork.year}</p>
                  </div>

                  {artwork.category && (
                    <div className="border-b border-gray-100 pb-2 md:pb-4">
                      <span className="text-xs uppercase tracking-[0.2em] text-gray-400">시리즈</span>
                      <p className="mt-1 md:mt-2 font-light">{artwork.category}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 썸네일 갤러리 */}
              {hasMultipleImages && (
                <div className="mt-3 md:mt-6 pt-3 md:pt-6 border-t border-gray-100">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 md:mb-3 block">이미지</span>
                  <div className="grid grid-cols-5 md:grid-cols-4 gap-1.5 md:gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative aspect-square overflow-hidden rounded transition-all ${
                          currentImageIndex === index
                            ? 'ring-2 ring-gray-900 opacity-100'
                            : 'ring-1 ring-gray-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${artwork.titleKo} ${index + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      </AnimatePresence>

      {/* 풀스크린 이미지 뷰어 */}
      <AnimatePresence>
        {isFullscreenView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreenView(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentImageIndex]}
                alt={artwork.titleKo}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />

              {/* 닫기 버튼 */}
              <button
                onClick={() => setIsFullscreenView(false)}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white hover:bg-gray-100 transition-colors rounded-full shadow-lg z-10"
                aria-label="Close fullscreen"
              >
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 이미지 카운터 */}
              {hasMultipleImages && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm shadow-lg">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}

              {/* 이전/다음 버튼 */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white hover:bg-gray-100 transition-colors rounded-full shadow-lg z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white hover:bg-gray-100 transition-colors rounded-full shadow-lg z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}