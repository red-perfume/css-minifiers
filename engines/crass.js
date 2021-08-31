'use strict';

const crass = require('crass');

const Engine = require('../engine.js');

module.exports = new Engine('crass', function (css) {
  return new Promise(function (resolve) {
    resolve('' + crass.parse(css).optimize({ o1: true }));
  });
});
