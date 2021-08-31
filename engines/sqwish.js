'use strict';

const Engine = require('../engine.js');

module.exports = new Engine('sqwish', function (css) {
  return new Promise(function (resolve) {
    resolve(require('sqwish').minify(css, true));
  });
});
