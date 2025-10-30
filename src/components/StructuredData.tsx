export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Elly Song',
    alternateName: '송엘리',
    url: siteUrl,
    jobTitle: 'Artist',
    description:
      '산티아고 순례길 1,400km 도보 여행의 경험을 바탕으로, 비단 위에 전통 채색화 기법을 사용해 다양한 기후와 환경 속 길 위의 풍경을 작업하는 한국 작가',
    knowsAbout: [
      '전통 채색화',
      '진채화',
      '한국화',
      '비단 회화',
      '산티아고 순례길',
    ],
    sameAs: ['https://www.instagram.com/elly__song_artist/'],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Elly Song - Artist Portfolio',
    url: siteUrl,
    description:
      '송엘리(Elly Song) 작가의 포트폴리오. 산티아고 순례길 1,400km 도보 여행의 경험을 바탕으로, 비단 위에 전통 채색화 기법을 사용해 다양한 기후와 환경 속 길 위의 풍경을 작업합니다.',
    inLanguage: 'ko-KR',
    author: {
      '@type': 'Person',
      name: 'Elly Song',
      alternateName: '송엘리',
    },
  }

  const artGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Elly Song Art Gallery',
    description: '송엘리 작가의 작품 갤러리',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Elly Song',
    },
    about: {
      '@type': 'VisualArtwork',
      artMedium: '비단에 채색',
      artform: '전통 채색화',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
