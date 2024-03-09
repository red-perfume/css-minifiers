'use strict';

const Engine = require('../engine.js');

module.exports = new Engine('lightningcss', function (css) {
  return new Promise(function (resolve) {
    const output = require('lightningcss')
      .transform({
        code: Buffer.from(css),
        minify: true
      });
    resolve(String(output.code));
  });
});
