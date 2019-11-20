let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');

// function ImgMinimin(){ // only when it's necessary
//     return gulp.src('./img/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('./images'))
// }

function serve() {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  });
  gulp.watch('./js/*.js').on('change', gulper);
  gulp.watch('*.scss').on('change', sassF);
  gulp.watch('./public/*.html').on('change', browserSync.reload);
}

function gulper() {
  return gulp
    .src('./public/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(gulp.dest('./public/js'));
}

function sassF() {
  return gulp
    .src('*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(
      autoprefixer({
        browsers: ['last 25 versions'],
        cascade: false,
      })
    )
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
}

// gulp.task(ImgMinimin); and add to gulp.series
gulp.task(sassF);
gulp.task(gulper);
gulp.task(serve);

gulp.task('default', gulp.series(sassF, gulper, serve));
