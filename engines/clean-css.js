'use strict';

const CleanCSS = require('clean-css');

const Engine = require('../engine.js');

module.exports = new Engine('clean-css', function (css) {
  return new CleanCSS({ returnPromise: true })
    .minify(css)
    .then(function (result) {
      return result.styles;
    });
});
