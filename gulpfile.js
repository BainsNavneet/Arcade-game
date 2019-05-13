const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('css-autoprefixer', () =>
  gulp.src('./src/css/**/*.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest('dest'))
);

gulp.task('image', () =>
  gulp.src('./src/images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dest/image'))
);
gulp.task('gulp-babel', () =>
  gulp.src('./src/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dest/js'))
);

gulp.task('copy-data', () => {
  return gulp.src('./*index.html')
    .pipe(gulp.dest('dest'));
});


gulp.task('default', gulp.series(
  'css-autoprefixer', 'image', 'gulp-babel', 'copy-data', 'copy-data', () => {
    gulp.watch('./src/js/**/*.js', gulp.series('gulp-babel'))
    gulp.watch('./src/css/**/*.css', gulp.series('css-autoprefixer'))
    gulp.watch('./index.html', gulp.series('copy-data'))
  }
));