'use strict';

const Engine = require('../engine.js');

module.exports = new Engine('ncss', function (css) {
  return new Promise(function (resolve) {
    resolve(require('ncss')(css));
  });
});
