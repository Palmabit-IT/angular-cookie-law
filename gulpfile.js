'use strict';

var del = require('del'),
    fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var pkg = require('./package.json');

var banner = ['/**',
  ' * <%= pkg.name %> - @version v<%= pkg.version %> - @author <%= pkg.author %>',
  ' */',
  ''].join('\n');

var destFileName = 'angular-cookie-law';


gulp.task('clean', function clean (cb) {
  return del(['dist'], cb);
});

gulp.task('csslint', function csslint () {
//  return gulp.src(['./src/css/*', './src/css/**/*'])
//      .pipe(plugins.csslint('.csslintrc'))
//      .pipe(plugins.csslint.reporter())
//      .pipe(count('csslint', 'files lint free'));
});

gulp.task('css', gulp.series('clean', function css () {
  return gulp.src(['./src/css/*', './src/css/**/*'])
      .pipe(plugins.header(banner, {pkg: pkg}))
      .pipe(gulp.dest('dist'));
}));

gulp.task('cssmin', gulp.series('css', function cssmin () {
  return gulp.src(['./src/css/*', './src/css/**/*'])
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(plugins.header(banner, {pkg: pkg}))
      .pipe(gulp.dest('dist'));
}));

gulp.task('jshint', function jshint () {
//  return gulp.src(paths.js)
//      .pipe(plugins.jshint())
//      .pipe(plugins.jshint.reporter('jshint-stylish'))
//      .pipe(plugins.jshint.reporter('fail'))
//      .pipe(count('jshint', 'files lint free'));
});

gulp.task('js', gulp.series('clean', function js () {
  return gulp.src(['./src/js/*', './src/js/**/*'])
      .pipe(plugins.concat(destFileName))
      .pipe(rename({ extname: '.js' }))
      .pipe(plugins.header(banner, {pkg: pkg}))
      .pipe(gulp.dest('dist'));
}));

gulp.task('uglify', gulp.series('js', function uglify () {
  return gulp.src(['./dist/*.js'])
      .pipe(plugins.uglify({mangle: false, output: {ascii_only: true}}))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(plugins.header(banner, {pkg: pkg}))
      .pipe(gulp.dest('dist'));
}));

gulp.task('default', gulp.parallel('clean', 'cssmin', 'uglify'));