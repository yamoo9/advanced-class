const path = require('node:path');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const concatCss = require('gulp-concat-css');
const { src, dest, series } = require('gulp');
const { config } = require('./package.json');

/* 구성(Configuration) -------------------------------------------------------- */

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
} = config;

/* 테스크(Tasks) --------------------------------------------------------------- */

function copyAssets() {
  return src([`${INPUT}/${ASSETS}/**/*`])
    .pipe(imagemin())
    .pipe(dest(`${OUTPUT}/${ASSETS}`))
    .pipe(gulpif(HAS_PREVIEW, dest(`${PREVIEW}/${BASE}/${ASSETS}`)));
}

function replaceBasePathHTML() {
  return src([
    `${INPUT}/*.html`,
    `${INPUT}/${PAGES}/**/*.html`,
    `!${INPUT}/lookbook/**/*.html`,
  ])
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
    );
}

function replaceBasePathCSS() {
  return src([`${INPUT}/${BUNDLE_STYLES}/*.css`])
    .pipe(replace(/url\((\"|\')?\/(?!\/)/g, `url(/${BASE}/`))
    .pipe(dest(`${OUTPUT}/${BUNDLE_STYLES}`))
    .pipe(gulpif(HAS_PREVIEW, dest(`${PREVIEW}/${BASE}/${BUNDLE_STYLES}`)));
}

exports.build = series(copyAssets, replaceBasePathHTML, replaceBasePathCSS);
