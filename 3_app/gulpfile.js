var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

gulp.task('html', function() {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('app/js/**/*.js')
  // .pipe(uglify())
  // .pipe(concat('script.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
  return gulp.src('app/images/**/*.+(png|jpg|gif)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    },
  });
});

gulp.task('default', ['browserSync', 'sass'], function(){
  gulp.watch('app/*.html', ['html']),
  gulp.watch('app/scss/*.scss', ['sass']),
  gulp.watch('app/js/*.js', ['js'])
  // gulp.watch('app/images/**/*', ['imagemin']);
});
