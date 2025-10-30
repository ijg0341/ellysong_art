# Instagram 크롤러

Instagram 게시물에서 이미지를 자동으로 다운로드하는 스크립트입니다.

## 크롤링 결과

총 **19개 작품**, **133개 이미지** 다운로드 완료!

각 작품 ID별로 폴더가 생성되어 있습니다:

```
crawling/
├── 35/     (6개 이미지)
├── 36/     (7개 이미지)
├── 37/     (5개 이미지)
├── 39/     (5개 이미지)
├── 40/     (5개 이미지)
├── 42/     (8개 이미지)
├── 43/     (5개 이미지)
├── 45/     (3개 이미지)
├── 46/     (8개 이미지)
├── 47/     (5개 이미지)
├── 48/     (6개 이미지)
├── 49/     (9개 이미지)
├── 50/     (10개 이미지)
├── 51/     (8개 이미지)
├── 52/     (6개 이미지)
├── 53/     (9개 이미지)
├── 54/     (10개 이미지)
├── 54.2/   (9개 이미지)
└── 55/     (9개 이미지)
```

## 사용 방법

### 1. 가상 환경 활성화

```bash
cd crawling
source venv/bin/activate
```

### 2. 크롤링 실행

```bash
./venv/bin/python instagram_crawler.py
```

### 3. 파일 정리 (필요한 경우)

만약 이미지가 이상한 경로에 다운로드되었다면:

```bash
./venv/bin/python organize_files.py
```

## 파일 설명

- `artworks_data.json`: 작품 데이터 (ID, 제목, Instagram 링크 등)
- `instagram_crawler.py`: Instagram 크롤링 메인 스크립트
- `organize_files.py`: 다운로드된 파일 정리 스크립트
- `venv/`: Python 가상 환경

## 새로운 작품 추가하기

1. `artworks_data.json` 파일에 새로운 작품 정보를 추가합니다:

```json
{
  "id": 60,
  "titleKo": "작품 제목",
  "titleEn": "Artwork Title",
  "material": null,
  "size": null,
  "year": null,
  "instagram": "https://www.instagram.com/p/[POST_CODE]/"
}
```

2. 크롤링 스크립트를 다시 실행합니다.

## 참고사항

- Instagram의 공개 게시물만 크롤링 가능합니다
- 게시물의 모든 이미지를 다운로드합니다 (캐러셀 포스트 포함)
- 비디오는 다운로드하지 않습니다
