#!/usr/bin/env python3
"""
Instagram 크롤러
각 작품의 Instagram 게시물에서 모든 이미지를 다운로드합니다.
"""

import json
import os
import sys
from pathlib import Path
import instaloader
import re

def extract_shortcode(instagram_url):
    """Instagram URL에서 shortcode를 추출합니다."""
    match = re.search(r'/p/([^/]+)/', instagram_url)
    if match:
        return match.group(1)
    return None

def download_instagram_post(loader, shortcode, output_dir):
    """Instagram 게시물의 모든 이미지를 다운로드합니다."""
    try:
        # shortcode로 게시물 가져오기
        post = instaloader.Post.from_shortcode(loader.context, shortcode)

        # 출력 디렉토리 생성
        os.makedirs(output_dir, exist_ok=True)

        # 게시물 다운로드
        loader.download_post(post, target=output_dir)

        print(f"✓ 다운로드 완료: {output_dir}")
        return True

    except Exception as e:
        print(f"✗ 다운로드 실패: {output_dir} - {str(e)}")
        return False

def main():
    # JSON 데이터 로드
    script_dir = Path(__file__).parent
    json_path = script_dir / "artworks_data.json"

    with open(json_path, 'r', encoding='utf-8') as f:
        artworks = json.load(f)

    # Instaloader 초기화
    loader = instaloader.Instaloader(
        download_videos=False,  # 비디오는 다운로드하지 않음
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        post_metadata_txt_pattern='',
    )

    # Instagram 링크가 있는 작품만 필터링
    artworks_with_instagram = [
        artwork for artwork in artworks
        if artwork.get('instagram')
    ]

    print(f"\n총 {len(artworks_with_instagram)}개의 작품에서 Instagram 이미지를 크롤링합니다.\n")

    success_count = 0
    fail_count = 0

    # 각 작품별로 크롤링
    for artwork in artworks_with_instagram:
        artwork_id = artwork['id']
        instagram_url = artwork['instagram']
        title = artwork.get('titleKo') or artwork.get('titleEn') or f"작품 {artwork_id}"

        print(f"\n[{artwork_id}] {title}")
        print(f"URL: {instagram_url}")

        # shortcode 추출
        shortcode = extract_shortcode(instagram_url)
        if not shortcode:
            print(f"✗ URL에서 shortcode를 추출할 수 없습니다.")
            fail_count += 1
            continue

        # 출력 디렉토리 설정 (ID로 폴더 생성)
        output_dir = script_dir / str(artwork_id)

        # 다운로드
        if download_instagram_post(loader, shortcode, str(output_dir)):
            success_count += 1
        else:
            fail_count += 1

    # 결과 출력
    print(f"\n{'='*50}")
    print(f"크롤링 완료!")
    print(f"성공: {success_count}개")
    print(f"실패: {fail_count}개")
    print(f"{'='*50}\n")

if __name__ == "__main__":
    main()
