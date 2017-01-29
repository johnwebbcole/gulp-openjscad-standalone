'use strict';
var path = require('path');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var del = require('del');


gulp.task('build', function () {
  return gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/marked/marked.min.js',
    './node_modules/axios/dist/axios.min.js'
  ])
    .pipe(plugins.plumber())
    .pipe(gulp.dest('docs'));
});

gulp.task('default', ['build']);
