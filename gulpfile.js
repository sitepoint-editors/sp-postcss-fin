var gulp = require('gulp');
var browserSync = require('browser-sync').create();

/**
 * gulp postcss : https://www.npmjs.com/package/gulp-postcss
 */
var postcss = require('gulp-postcss');

var cssnext = require('postcss-cssnext');
var cssnano = require('cssnano');
var messages = require('postcss-browser-reporter');

/** 
 * file paths stored in variables
 * ex. gulp.src(input) === gulp.src('./css/*.css')
 */
var input = './css/*.css';
var output = './build/css';

// Static Server + watching scss/html files
gulp.task('serve', function () {
    browserSync.init({
        server: "./build"
    });
    gulp.watch(input, ['style']);
    gulp.watch(input).on('change', browserSync.reload);
});

gulp.task('style', function () {
    var processors = [
        cssnext,
        cssnano,
        messages
    ];
    return gulp.src(input)
        .pipe(postcss(processors))
        .pipe(gulp.dest(output))
});

gulp.task('default', ['serve']);
