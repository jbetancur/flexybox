const gulp = require('gulp'),
    gclean = require('gulp-clean'),
    gsass = require('gulp-sass'),
    gsourcemaps = require('gulp-sourcemaps'),
    gautoprefixer = require('gulp-autoprefixer'),
    gcleanCSS = require('gulp-clean-css'),
    grename = require("gulp-rename");

const pkg = require('./package.json'),
    flexySrc = 'src/flexybox/flexybox.scss',
    flexyDest = 'dist',
    demoSrc = 'src/demo',
    demoDest = 'demo',
    autoPrefixBrowserCompat = ['last 10 versions', 'IE 10'];

gulp.task('default', ['build-css', 'build-demo']);

gulp.task('clean', ()=> {
    return gulp.src(flexyDest, { read: false })
        .pipe(gclean());
});

/**
 * FlexyBox
 */
gulp.task('build-css', ['clean'], ()=> {
    return gulp.src(flexySrc)
        // .pipe(grename({
        //     suffix: `.${pkg.version}`
        // }))
        .pipe(gulp.dest(flexyDest))
        .pipe(gsourcemaps.init())
        .pipe(gsass())
        .pipe(gautoprefixer({
            browsers: autoPrefixBrowserCompat,
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


/**
 * Demo
 */
gulp.task('build-demo', ['copy-demo-files', 'copy-libs'], ()=> {
    return gulp.src(`${demoSrc}/demo.scss`)
        .pipe(gsass())
        .pipe(gautoprefixer({
            browsers: autoPrefixBrowserCompat,
            cascade: false
        }))
        .pipe(gulp.dest(demoDest));
});

gulp.task('copy-demo-files', [], ()=> {
    return gulp.src(`${demoSrc}/index.html`)
        .pipe(gulp.dest(demoDest));
});

gulp.task('copy-libs', [], ()=> {
    return gulp.src(`${flexyDest}/flexybox.css`)
        .pipe(gulp.dest(demoDest));
});