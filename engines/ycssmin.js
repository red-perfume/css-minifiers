'use strict';

const Engine = require('../engine.js');

module.exports = new Engine('ycssmin', function (css) {
  return new Promise(function (resolve) {
    resolve(require('ycssmin').cssmin(css));
  });
});
