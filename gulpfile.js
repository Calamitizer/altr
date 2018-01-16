(function() {
    'use strict';

    var gulp = require('gulp');
    var del = require('del');
    var replace = require('gulp-replace');
    var less = require('gulp-less');
    var concat = require('gulp-concat');
    var autoprefixer = require('gulp-autoprefixer');
    var cssmin = require('gulp-cssmin');
    var rename = require('gulp-rename');
    var webpack = require('webpack-stream');
    var sequence = require('run-sequence');

    var path = require('path');

    var wpConfig = require(path.join(__dirname, 'webpack.config.js'));

    var dir = {
        srv: path.join(__dirname, 'server'),
        in: path.join(__dirname, 'client', 'src'),
        out: path.join(__dirname, 'client', 'www'),
    };

    var files = {
        html: {
            in: [
                path.join(dir.in, '**', '*.html'),
            ],
        },
        less: {
            common: [
                dir.in + '/less-common/',
            ],
            in: [
                dir.in + '/less-common/normalize.css',
                dir.in + '/**/*.less',
                '!' + dir.in + '/less-common/*.less', // these will be imported
            ],
        },
        js: {
            in: path.join(dir.in, 'entry.js'),
            out: path.join(dir.out, 'bundle.js'),
        },
        img: {
            in: dir.in + '/img/**/*',
            out: dir.out + '/img/',
        },
    };

    gulp.on('error', function(err) {
        console.log('Gulp has encountered an error:\n');
        throw err;
    });

    gulp.task('clean', function() {
        var options = {
            dryRun: false,
        };

        return del(
            [path.join(dir.out, '**', '*')],
            options
        ).then(function(paths) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });

    gulp.task('lint', function() {
        /* */
    });

    gulp.task('html', function() {
        var target = '<!-- inject:js -->';
        var injection = '<script type="text/javascript" src="bundle.js"></script>';

        gulp
            .src(files.html.in)
            .pipe(replace(target, injection))
            .pipe(gulp.dest(dir.out));
    });

    gulp.task('less', function() {
        return (
            gulp
                .src(files.less.in)
                .pipe(less({
                    paths: files.less.common,
                }))
                .pipe(concat('style.css'))
                .pipe(autoprefixer())
                .pipe(cssmin())
                .pipe(rename({
                    suffix: '.min',
                }))
                .pipe(gulp.dest(dir.out))
        );
    });

    gulp.task('js', function() {
        return (
            gulp
                .src(files.js.in)
                .pipe(webpack(wpConfig))
                .pipe(gulp.dest(dir.out))
        );
    });

    gulp.task('img', function() {
        return (
            gulp
                .src(files.img.in)
                .pipe(gulp.dest(files.img.out))
        );
    });

    gulp.task('build', function() {
        sequence(
            [
                'clean',
                'lint',
            ],
            [
                'html',
                'less',
                'js',
                'img',
            ]
        );
    });
}());
