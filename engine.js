'use strict';

const fs = require('fs');
const path = require('path');

const pretty = require('pretty-hrtime');

function Engine (name, fn) {
  if (!(this instanceof Engine)) {
    return new Engine();
  }
  this.name = name;
  this.func = fn;

  const exports = this.func;
  exports.version = this._getKey('version');
  exports.url = this._getKey('homepage');
  exports.toString = this.toString.bind(this);

  exports.bench = function (css, precise) {
    let start = process.hrtime();
    return new Promise(function (resolve, reject) {
      Promise.resolve(fn(css))
        .then(
          function () {
            resolve(pretty(process.hrtime(start), { precise: precise }));
          },
          function (err) {
            reject(err);
          }
        );
    });
  };

  return exports;
}

Engine.prototype._getKey = function (key) {
  const manifestPath = path.join('node_modules', this.name, 'package.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath));
  return manifest[key];
};

Engine.prototype.toString = function () {
  return this.name;
};

module.exports = Engine;
