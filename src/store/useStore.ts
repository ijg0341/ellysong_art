import { create } from 'zustand'

interface AppState {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}))