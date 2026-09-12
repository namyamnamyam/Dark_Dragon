# Dark Dragon

《내 몸 속 봉인된 최악의 마룡》 작품 홍보용 랜딩페이지입니다.

## 구성

- MAIN
- STORY
- CHARACTERS
- ABADDON
- CONTRACT
- START

## 실행

정적 사이트라서 `index.html`을 열면 바로 동작합니다.
GitHub Pages를 사용할 경우 저장소의 `main` 브랜치 루트를 배포 대상으로 설정하면 됩니다.

## 작품 링크 연결

`script.js`의 아래 값을 실제 Crack 작품 주소로 바꾸면 마지막 `작품 시작하기` 버튼이 연결됩니다.

```js
const CRACK_STORY_URL = '';
```

## 이미지 교체

사이트는 이미지가 아직 없어도 그라디언트 기반 대체 비주얼이 보이도록 만들어져 있습니다.
실제 이미지를 넣을 때는 `assets/images/README.md`의 파일명을 그대로 사용하면 CSS 수정 없이 바로 적용됩니다.
