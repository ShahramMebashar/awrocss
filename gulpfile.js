const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const paths = require('./configs/paths');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');

// === Styles
function css() {
  return src(paths.sass.src)
    .pipe(sass())
    .once('error', sass.logError)
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.sass.dest))
    .pipe(browserSync.stream());
}

// === Javascript
function js() {
  return src(paths.js.src)
    .pipe(dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// === Browser reload
function reload(done) {
  browserSync.reload();
  done();
}

// === Serve files === Server paths
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: __dirname,
    },
    port: 5000,
    open: true,
  });

  watch('./*.html').on('change', reload);
  watch('./src/sass/**/*.scss', css);
  watch('./src/js/**/*.js', js);
}

//TODO: create a clean function to clean resources

// const build = parallel(html, css, js);
const build = parallel(css, js);
const serve = parallel(build, watchFiles);

exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = serve;
exports.default = build;
