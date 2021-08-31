# css-minifiers [![Build Status](https://travis-ci.org/ben-eb/css-minifiers.svg?branch=master)][ci] [![npm version](https://badge.fury.io/js/css-minifiers.svg)][npm]

> (almost) all CSS minifiers available for node.js

## Why?

This module provides a convenient list of the CSS minifiers that are out there
for the Node ecosystem, should you need to compare minification results across
engines. It has mostly been inspired from [the minification benchmark][1], and
provides a simple, normalised API for all available tools.

## Engine support

Engine                                                    | Support | Notes
:--                                                       | :--     | :--
[clean-css](https://github.com/jakubpawlowicz/clean-css)  | ✅      |
[crass](https://github.com/mattbasta/crass)               | ✅      | Smallest file size out of all tested
[css-condense](https://github.com/rstacruz/css-condense)  | ✅      |
[css-smasher](https://github.com/MarkBennett/css-smasher) | ❌      |
[cssnano](https://github.com/ben-eb/cssnano)              | ❌      | Verions 3 worked, but 5 now requires PostCSS to import a jungle with a gorrilla to get a banana
[csso](https://github.com/css/csso)                       | ✅      |
[cssshrink](https://github.com/stoyan/cssshrink)          | ❌      | It uses "latest" dependency versions that are incompatible with it
[csswring](https://github.com/hail2u/node-csswring)       | ✅      |
[more-css](https://github.com/army8735/more)              | ❌      |
[ncss](https://github.com/wasche/ncss)                    | ✅      |
[sqwish](https://github.com/ded/sqwish)                   | ✅      |
[ycssmin](https://github.com/yui/ycssmin)                 | ✅      | largest file size out of all tested


If you've written a minifier that you'd like to add to this list, please send a
pull request!

## Usage

Since version 2, all minifiers are wrapped with the Promise API:

```js
var minifiers = require('css-minifiers');
var css = 'h1 { color: #880000; }';
var csso = minifiers.csso;

csso(css).then(function (output) {
    console.log(output);
    // => h1{color:#800}
});
```

Get a benchmark compression time:

```js
csso.bench(css).then(function (output) {
    console.log(output);
    // => 1.4 ms
});

csso.bench(css, true).then(function (output) {
    console.log(output);
    // => 1.399856 ms
});
```

The version number & homepage for the engine are also exposed:

```js
console.log(csso.version, csso.url);
// => 1.3.11 https://github.com/css/csso
```

## Install

With [npm](https://npmjs.com) do:

```
npm install css-minifiers
```

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.

## License

MIT © Ben Briggs

[1]: https://github.com/GoalSmashers/css-minification-benchmark

[ci]:   https://travis-ci.org/ben-eb/css-minifiers
[npm]:  http://badge.fury.io/js/css-minifiers
