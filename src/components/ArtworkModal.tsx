'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Artwork } from '@/types/artwork'

interface ArtworkModalProps {
  artwork: Artwork | null
  onClose: () => void
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (artwork) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [artwork, onClose])

  if (!artwork) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[90vw] max-w-6xl h-[90vh] bg-white shadow-2xl"
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

          <div className="flex flex-col md:flex-row h-full">
            <div className="relative flex-1 md:flex-[2] h-[50%] md:h-full bg-gray-50">
              <Image
                src={artwork.imagePath}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-contain p-4"
                priority
              />
            </div>
            
            <div className="p-6 md:p-10 md:w-[360px] bg-white flex flex-col justify-center overflow-y-auto">
              <h2 className="text-2xl font-light tracking-wide mb-8">{artwork.title}</h2>
              
              <div className="space-y-6 text-gray-600">
                <div className="border-b border-gray-100 pb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-400">재료</span>
                  <p className="mt-2 font-light">{artwork.material}</p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-400">크기</span>
                  <p className="mt-2 font-light">{artwork.dimensions}</p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-400">제작년도</span>
                  <p className="mt-2 font-light">{artwork.year}</p>
                </div>
                
                {artwork.category && (
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">시리즈</span>
                    <p className="mt-2 font-light">{artwork.category}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}