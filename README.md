# 중급 보충 강의

## 학습 주제

정규 강의를 보충하는 주말 강의에서 다루는 학습 주제는 다음과 같습니다.

- Component driven User Interfaces
- Component driven Development with Lookbook
- CSS Post processing (with [PostCSS](https://postcss.org))
- Build process (with [Gulp](https://gulpjs.com))

## 다운로드 및 패키지 설치

[degit](https://github.com/Rich-Harris/degit#readme) 명령을 사용해 학습 저장소 자료를 다운로드 받습니다.

```sh
degit yamoo9/advanced-class advanced-class
```

다운로드 받은 폴더로 이동한 다음, 개발 종속성 패키지를 설치합니다.

```sh
cd advanced-class && pnpm install
```

## 개발 명령

개발 서버를 구동합니다.

```sh
pnpm dev
```

## 빌드 구성

빌드 프로세스를 거쳐 결과가 생성됩니다.

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

## GitHub Pages 프리뷰

빌드 명령 실행 후, GitHub 배포 전에 프리뷰 할 수 있습니다.

```sh
pnpm preview
```

## SVG 스프라이트 생성

[package.json](./package.json) 파일을 열어 SVG 스프라이트 이미지 자동 생성 구성을 설정할 수 있습니다.

```json
{
  "config": {
    "svg": {
      "input": "SVG 폴더 이름",
      "output": "SVG 스프라이트 폴더 이름",
      "filename": "SVG 스프라이트 이미지 이름"
    }
  }
}
```

SVG 스프라이트 이미지를 1회 생성합니다.

```sh 
pnpm svg
```

SVG 폴더의 변경 상황을 감지해 변경될 때마다 SVG 스프라이트 이미지를 N회 생성합니다.

```sh 
pnpm watch:svg
```