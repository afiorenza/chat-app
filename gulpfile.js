var exec = require('child_process').exec;
var	gulp = require('gulp');
var	run = require('run-sequence');

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

var handleError = function (error) {
    console.log(error);
    this.emit('end');
};

gulp.task('run-service', function () {
    exec('node ./backend/index.js', function (error, stdout, stderr) {
        console.log('Error: ', error);
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    });
});

gulp.task('deploy-desktop', function () {
    exec('cd ./desktop/ && gulp', function (error, stdout, stderr) {
        console.log('Error: ', error);
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    });
});

gulp.task('default', function () {
    run('run-service', 'deploy-desktop');
});