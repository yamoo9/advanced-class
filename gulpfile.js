const path = require('node:path');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const concatCss = require('gulp-concat-css');
const { src, dest, series, watch } = require('gulp');
const { config } = require('./package.json');

/* -------------------------------------------------------------------------- */
/* 구성(Configuration)                                                          */
/* -------------------------------------------------------------------------- */

const {
  base: BASE,
  input: INPUT,
  output: OUTPUT,
  assets: ASSETS,
  styles: STYLES,
  bundle_styles: BUNDLE_STYLES,
  pages: PAGES,
  has_preview: HAS_PREVIEW,
  preview: PREVIEW,
  svg: SVG,
} = config;

/* -------------------------------------------------------------------------- */
/* 테스크(Tasks)                                                                 */
/* -------------------------------------------------------------------------- */

/* 에셋(Assets) 테스크 ----------------------------------------------------------- */

function copyAssets() {
  return src([`${INPUT}/${ASSETS}/**/*`])
    .pipe(imagemin())
    .pipe(dest(`${OUTPUT}/${ASSETS}`))
    .pipe(gulpif(HAS_PREVIEW, dest(`${PREVIEW}/${BASE}/${ASSETS}`)))
    .on('end', () => console.log('🍟 에셋 복제 및 최적화 완료!'));
}

/* HTML, CSS 테스크 ------------------------------------------------------------ */

function replaceBasePathHTML() {
  return src([
    `${INPUT}/*.html`,
    `${INPUT}/${PAGES}/**/*.html`,
    `!${INPUT}/${PAGES}/template.html`,
    `!${INPUT}/lookbook/**/*.html`,
  ])
    .pipe(
      replace(
        '<link rel="stylesheet" href="/lookbook/assets/styles/main.css" />',
        ''
      )
    )
    .pipe(replace('<link rel="stylesheet" href="/lookbook/index.css" />', ''))
    .pipe(
      replace('<script type="module" src="/lookbook/index.js"></script>', '')
    )
    .pipe(replace(/=("|')\/(?!\/)/g, `="/${BASE}/`))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      dest((file) =>
        file.dirname.includes(PAGES) ? `${OUTPUT}/${PAGES}` : OUTPUT
      )
    )
    .pipe(
      gulpif(
        HAS_PREVIEW,
        dest((file) =>
          file.dirname.includes(PAGES)
            ? `${PREVIEW}/${BASE}/${PAGES}`
            : `${PREVIEW}/${BASE}`
        )
      )
    )
    .on('end', () => console.log('🍟 HTML 빌드 완료!'));
}

function replaceBasePathCSS() {
  return src([`${INPUT}/${BUNDLE_STYLES}/*.css`])
    .pipe(replace(/url\((\"|\')?\/(?!\/)/g, `url(/${BASE}/`))
    .pipe(dest(`${OUTPUT}/${BUNDLE_STYLES}`))
    .pipe(gulpif(HAS_PREVIEW, dest(`${PREVIEW}/${BASE}/${BUNDLE_STYLES}`)))
    .on('end', () => console.log('🍟 CSS 빌드 완료!'));
}

exports.build = series(copyAssets, replaceBasePathHTML, replaceBasePathCSS);

/* SVG 스프라이트 이미지 생성 테스크 ----------------------------------------------------- */

async function makeSvgSprites() {
  const { stacksvg } = await import('gulp-stacksvg');

  return src([`${SVG.input}/**/*.svg`])
    .pipe(
      stacksvg({
        output: SVG.filename,
        separator: '_',
        spacer: '-',
      })
    )
    .pipe(dest(SVG.output))
    .on('end', () => console.log('🎸 SVG 스프라이트 이미지 생성'));
}

exports.svg = makeSvgSprites;

async function watchSvg() {
  watch([`${SVG.input}/**/*.svg`], series(makeSvgSprites));
}

exports.watchSvg = watchSvg;
