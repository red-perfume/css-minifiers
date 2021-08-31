'use strict';

const Engine = require('../engine.js');

module.exports = new Engine('sass', function (css) {
  return new Promise(function (resolve, reject) {
    require('sass').render({ data: css, outputStyle: 'compressed' }, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(String(result.css));
      }
    });
  });
});
