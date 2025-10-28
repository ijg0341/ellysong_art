'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Contact from '@/components/Contact'
import ArtworkModal from '@/components/ArtworkModal'
import { Artwork } from '@/types/artwork'

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery onSelectArtwork={setSelectedArtwork} />
        <About />
        <Contact />
      </main>
      <ArtworkModal 
        artwork={selectedArtwork} 
        onClose={() => setSelectedArtwork(null)} 
      />
    </>
  )
}