'use strict';

const Engine = require('../engine.js');

module.exports = new Engine('csso', function (css) {
  return new Promise(function (resolve) {
    resolve(require('csso').minify(css).css);
  });
});
