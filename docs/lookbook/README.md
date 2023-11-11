# 컴포넌트 룩북

룩북 실행을 위한 조건은 다음과 같습니다.

[1] 웹 서버의 루트 경로에 lookbook 폴더가 위치해야 합니다.

```bash
docs/
├── lookbook/
├── assets/
├── styles/
└── index.html
```

[2] 룩북 엔트리 파일 호출이 필요합니다.

docs/index.html
```html
<script type="module" src="/lookbook/index.js"></script>
```