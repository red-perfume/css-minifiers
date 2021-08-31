'use strict';

const csswring = require('csswring');

const Engine = require('../engine.js');

module.exports = new Engine('csswring', function (css) {
  return new Promise(function (resolve) {
    resolve(csswring.wring(css).css);
  });
});
