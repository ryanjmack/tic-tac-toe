var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('default', ['sass', 'serve']);

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    gulp.watch('./src/stylesheets/sass/*.scss', ['sass']);
    gulp.watch('./src/js/*.js').on('change', browserSync.reload);
    gulp.watch('./src/*.html').on('change', browserSync.reload);

});

gulp.task('sass', function() {
    gulp.src('./src/stylesheets/sass/master.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/stylesheets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
