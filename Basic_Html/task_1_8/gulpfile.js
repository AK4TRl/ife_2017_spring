var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('testLess',function () {
    gulp.src('less/styles.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
});

