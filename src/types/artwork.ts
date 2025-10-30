export interface Artwork {
  id: number
  titleKo: string
  titleEn: string
  dimensions: string
  material: string
  year: string | number
  imagePath: string
  images?: string[] // 여러 이미지가 있는 경우 (디렉토리 내 이미지들)
  category?: string
  instagram?: string | null
}