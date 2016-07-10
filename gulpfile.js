const gulp = require('gulp'),
    gclean = require('gulp-clean'),
    gsass = require('gulp-sass'),
    gsourcemaps = require('gulp-sourcemaps'),
    gautoprefixer = require('gulp-autoprefixer'),
    gcleanCSS = require('gulp-clean-css'),
    grename = require("gulp-rename");

const flexySrc = 'src/scss/flexybox.scss',
    flexyDest = 'dist';

gulp.task('default', ['build-css']);

gulp.task('clean', ()=> {
    return gulp.src(flexyDest, { read: false })
        .pipe(gclean());
});

gulp.task('build-css', ['clean'], ()=> {
    return gulp.src(flexySrc)
        .pipe(gulp.dest(flexyDest))
        .pipe(gsourcemaps.init())
        .pipe(gsass())
        .pipe(gautoprefixer({
            browsers: ['last 10 versions', 'IE 10'],
            cascade: false
        }))
        .pipe(gulp.dest(flexyDest))
        .pipe(gcleanCSS({ debug: true }, details => {
            console.log(`Before: ${details.name}:${details.stats.originalSize}`);
            console.log(`After: ${details.name}:${details.stats.minifiedSize}`);
        }))
        .pipe(gsourcemaps.write('./', {
            sourceMappingURL: file => {
                return file.relative + '.map';
            }
        }))
        .pipe(grename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(flexyDest));
});