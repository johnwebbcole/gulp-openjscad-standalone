var through = require('through2');
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var pkg = require('./package.json');
var marked = require('marked');
var _ = require('lodash');
var template = _.template;

function getFiles(stream) {
  pkg.files.forEach(function (file) {
    var filepath = path.resolve(__dirname, file);
    var f = new gutil.File({
      path: file.replace('docs/', ''),
      contents: fs.readFileSync(filepath)
    });
    stream.push(f);
  });
}

function renderIndex(stream, options) {

  var filepath = path.resolve(__dirname, 'docs/index.tmpl');

  var text = _.template(fs.readFileSync(filepath, 'utf8'))(options);
  // var text = fs.readFileSync(filepath, 'utf8').toString();

  var f = new gutil.File({
    path: 'index.html',
    contents: new Buffer(text)
  });
  stream.push(f);
}

function copyDist(stream, main) {
  var filepath = path.resolve(__dirname, main);
  var f = new gutil.File({
    path: path.basename(main),
    contents: fs.readFileSync(filepath)
  });
  stream.push(f);
}

module.exports = function (options) {

  var renderer = new marked.Renderer();
  renderer.image = function (href, title, text) {
    var newhref = href.replace('docs/', '');
    return `<img src="${newhref}" alt="${text}" title="${title}">`;
  };

  return through.obj(function (file, encoding, callback) {
    var self = this;
    var target = JSON.parse(file.contents.toString());
    var basepath = path.dirname(file.path);
    options = Object.assign({
      readme: marked(fs.readFileSync(path.resolve(basepath, 'README.md'), 'utf8'), {
          renderer: renderer
      }),
      filepath: path.resolve(basepath, target.main),
      filename: path.basename(target.main),
      title: target.description,
      version: target.version,
      name: target.name,
      theme:'<link rel="stylesheet" href="themes/architect/css/style.css" type="text/css">'
    }, options);

    copyDist(self, options.filepath);
    getFiles(self);
    renderIndex(self, options);
    callback();
  });
};
