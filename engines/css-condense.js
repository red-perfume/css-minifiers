'use strict';

const Engine = require('../engine.js');

module.exports = new Engine('css-condense', function (css) {
  return new Promise(function (resolve) {
    resolve(require('css-condense').compress(css));
  });
});
