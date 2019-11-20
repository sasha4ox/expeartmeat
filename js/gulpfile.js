"use strict";

var gulp = require('gulp');

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var autoprefixer = require('gulp-autoprefixer');

var babel = require('gulp-babel');

var imagemin = require('gulp-imagemin'); // function ImgMinimin(){ // only when it's necessary
//     return gulp.src('./img/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('./images'))
// }


function serve() {
  browserSync.init({
    server: {
      baseDir: './public/html'
    }
  });
  gulp.watch('./js/*.js').on('change', gulper);
  gulp.watch('*.scss').on('change', sassF);
  gulp.watch('./public/html/*.html').on('change', browserSync.reload);
}

function gulper() {
  return gulp.src('./public/js/*.js').pipe(babel({
    presets: ['@babel/env']
  })).pipe(gulp.dest('./public/js'));
}

function sassF() {
  return gulp.src('*.scss').pipe(sass()).pipe(gulp.dest('./public/css')).pipe(autoprefixer({
    browsers: ['last 25 versions'],
    cascade: false
  })).pipe(gulp.dest('./public/css')).pipe(browserSync.stream());
} // gulp.task(ImgMinimin); and add to gulp.series


gulp.task(sassF);
gulp.task(gulper);
gulp.task(serve);
gulp.task('default', gulp.series(sassF, gulper, serve));