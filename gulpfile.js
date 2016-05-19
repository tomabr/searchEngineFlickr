var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('js', function () {
  gulp.src(['javascripts/assets/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('javascripts'));
});


gulp.task('styles', function() {
    gulp.src('stylesheets/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('stylesheets/css/'));
});


gulp.task('watch', ['js', 'styles'], function() {
  gulp.watch('javascripts/assets/**/*.js', ['js']);
  gulp.watch('stylesheets/sass/*.sass', ['styles']);
});
