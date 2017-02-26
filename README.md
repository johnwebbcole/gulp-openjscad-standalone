# gulp-openjscad-standalone [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A gulp plugin to create a github page from an OpenJsCad project.

https://johnwebbcole.github.io/gulp-openjscad-standalone/

## Installation

```sh
$ npm install --save gulp-openjscad-standalone gulp-load-plugins gulp-plumber
```

## Usage

```js
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('docs', function() {
  return gulp.src('package.json')
    .pipe(plugins.plumber())
    .pipe(plugins['openjscad-standalone']())
    .pipe(gulp.dest('docs'));
});
```
## License

ISC © [John Cole]()


[npm-image]: https://badge.fury.io/js/openjscad-standalone.svg
[npm-url]: https://npmjs.org/package/openjscad-standalone
[travis-image]: https://travis-ci.org/johnwebbcole/openjscad-standalone.svg?branch=master
[travis-url]: https://travis-ci.org/johnwebbcole/openjscad-standalone
[daviddm-image]: https://david-dm.org/johnwebbcole/openjscad-standalone.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/johnwebbcole/openjscad-standalone
