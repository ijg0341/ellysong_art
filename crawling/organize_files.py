#!/usr/bin/env python3
"""
크롤링된 파일들을 올바른 폴더로 정리합니다.
"""

import os
import shutil
from pathlib import Path

def main():
    script_dir = Path(__file__).parent

    # 이상한 경로 문자로 시작하는 폴더 찾기
    weird_dirs = [d for d in script_dir.iterdir() if d.is_dir() and '∕' in d.name]

    print(f"총 {len(weird_dirs)}개의 폴더를 정리합니다.\n")

    for weird_dir in weird_dirs:
        # 폴더 이름에서 ID 추출
        folder_id = weird_dir.name.split('∕')[-1]

        # 대상 폴더
        target_dir = script_dir / folder_id

        print(f"[{folder_id}] 파일 이동 중...")

        # 파일 이동
        for file_path in weird_dir.iterdir():
            if file_path.is_file():
                target_file = target_dir / file_path.name
                shutil.move(str(file_path), str(target_file))
                print(f"  ✓ {file_path.name}")

        # 빈 폴더 삭제
        shutil.rmtree(weird_dir)

    print("\n정리 완료!")

if __name__ == "__main__":
    main()
