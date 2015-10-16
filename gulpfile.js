var gulp = require('gulp');
var less = require('gulp-less');


gulp.task('styles', function() {
    gulp.src(['public/styles/style.less'])
        .pipe(less())
        .pipe(gulp.dest('public/dist/style'))
})