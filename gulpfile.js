const gulp = require('gulp'),
    gclean = require('gulp-clean'),
    gsass = require('gulp-sass'),
    gsourcemaps = require('gulp-sourcemaps'),
    gcleanCSS = require('gulp-clean-css'),
    grename = require("gulp-rename");

const flexySrc = 'src/scss/flexybox.scss',
    flexyDest = 'dist';

gulp.task('default', ['clean', 'build-css']);

gulp.task('clean', ()=> {
    return gulp.src(flexyDest, { read: false })
        .pipe(gclean());
});

gulp.task('build-css', ()=> {
    return gulp.src(flexySrc)
        .pipe(gsourcemaps.init())
        .pipe(gsass())
        .pipe(gulp.dest(flexyDest))
        .pipe(gcleanCSS({ debug: true }, details => {
            console.log(`${details.name}:${details.stats.originalSize}`);
            console.log(`${details.name}:${details.stats.minifiedSize}`);
        }))
        .pipe(gsourcemaps.write())
        .pipe(grename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(flexyDest));
});