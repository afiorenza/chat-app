var argv = require('yargs').argv;
var	browserify = require('browserify');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var	concat = require('gulp-concat');
var	gulp = require('gulp');
var jsHint = require('gulp-jshint');
var	reactify = require('reactify');
var	run = require('run-sequence');
var	sass = require('gulp-sass');
var	source = require('vinyl-source-stream');

var config = {
    js: {
        main: './source/javascript/index.js',
        name: 'app.js',
        destination: './dist/',
        watch: [
            './source/javascript/**/*.js'
        ]
    },
    html: {
        main: './source/templates/index.html',
        name: 'index.html',
        destination: './dist/',
        watch: [
            './source/templates/*.html'
        ]
    },
    sass: {
        main: './source/sass/**/*.scss',
        name: 'style.css',
        destination: './dist/',
        watch: [
            './source/sass/**/*.scss'
        ]
    }
};

gulp.task('sass', function () {
    return gulp
        .src(config.sass.watch)
        .pipe(sass())
        .on('error',handleError)
        .pipe(concat(config.sass.name))
        .pipe(gulp.dest(config.sass.destination));
});

gulp.task('sass-watch', ['sass'], browserSync.reload);


gulp.task('js', function () {
    return browserify({
        entries: [config.js.main],
        transform: [reactify],
        debug: true
    })
        .bundle()
        .on('error', handleError)
        .pipe(source(config.js.name))
        .pipe(gulp.dest(config.js.destination));
});

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('html', function () {
    return gulp.src(config.html.main)
        .pipe(gulp.dest(config.html.destination));
});

gulp.task('html-watch', ['html'], browserSync.reload);

var handleError = function (error) {
    console.log(error);
    this.emit('end');
};

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './dist/'
        },
        port: '8080'
    });

    gulp.watch(config.html.watch, ['html-watch']);
    gulp.watch(config.sass.watch, ['sass-watch']);
    gulp.watch(config.js.watch, ['js-watch']);
});

gulp.task('lint', function () {
    gulp.src(config.js.main)
        .pipe(jsHint())
        .pipe(jsHint.reporter('default'));
});

gulp.task('default', function () {
    run('html', 'sass', 'js', 'browser-sync');
});