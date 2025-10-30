'use client'

import { useState } from 'react'
import Image from 'next/image'
import { artworks, categories } from '@/utils/artworks'
import { Artwork } from '@/types/artwork'
import { cn } from '@/lib/utils'

interface GalleryProps {
  onSelectArtwork: (artwork: Artwork) => void
}

export default function Gallery({ onSelectArtwork }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const filteredArtworks = selectedCategory === '전체' 
    ? artworks 
    : artworks.filter(art => art.category === selectedCategory)

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-center mb-16 tracking-[0.2em]">GALLERY</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2 text-sm font-light tracking-[0.15em] transition-all duration-300",
                selectedCategory === category
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group cursor-pointer"
              onClick={() => onSelectArtwork(artwork)}
            >
              <div className="relative overflow-hidden bg-gray-50">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={artwork.imagePath}
                    alt={artwork.titleKo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-base font-light tracking-wide">{artwork.titleKo}</h3>
                <p className="text-sm text-gray-500 mt-2 font-light">
                  {artwork.material} · {artwork.year}
                </p>
                <p className="text-xs text-gray-400 mt-1">{artwork.dimensions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}