var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var twig = require('gulp-twig');

var myData = require('./app/data.json');
gulp.task('twig', function(){
    return gulp.src('app/views/*.twig')
    .pipe(twig({
        data: myData
    }))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', function() {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass', 'twig'], function (){
    gulp.watch('app/views/**/*.twig', ['twig']);
    gulp.watch('app/assets/scss/**/*.scss', ['sass']);
    gulp.watch('app/views/**/*.twig', browserSync.reload); 
    gulp.watch('app/assets/js/**/*.js', browserSync.reload); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});


gulp.task('default', ['sass', 'watch',  'twig', 'browserSync'], function (){});