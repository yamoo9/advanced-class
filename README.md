# 중급 보충 강의

## 학습 주제

정규 강의를 보충하는 주말 강의에서 다루는 학습 주제는 다음과 같습니다.

- Component driven User Interfaces
- Component driven Development with Lookbook
- CSS Post processing (with [PostCSS](https://postcss.org))
- Build process (with [Gulp](https://gulpjs.com))

### 빌드 구성

빌드 명령을 실행하면 결과가 출력됩니다.

```sh
pnpm build
```

[package.json](./package.json) 파일을 열어 빌드 구성을 설정할 수 있습니다.

```js
{
  "config": {
    "base": "배포할 GitHub Pages 저장소 이름",
    "input": "소스 폴더 이름",
    "output": "docs → GitHub Pages 저장소의 웹 루트",
    "assets": "에셋 폴더 이름",
    "styles": "PostCSS 폴더 이름",
    "bundle_styles": "styles → 번들된 CSS 폴더",
    "pages": "페이지 폴더 이름",
    "has_preview": true, // 프리뷰(미리보기) 생성 여부 : GitHub 배포 전 로컬 환경에서 확인용
    "preview": "preview → 프리뷰 폴더 이름"
  }
}
```

### 프리뷰

빌드 명령 실행 후, GitHub 배포 전에 프리뷰 할 수 있습니다.

```sh
pnpm preview
```