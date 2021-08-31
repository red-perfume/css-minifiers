'use strict';

var Engine = require('../engine');

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
