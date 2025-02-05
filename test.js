'use strict';

const test = require('tape');
const minifiers = require('./');

const charset = '@charset "utf-8";';
const utf16Encoding = '\ufeff';
const h1Long = 'h1::before,';
const h1Bad = 'h1:before,';
const h1 = 'h1:before{';
const marginOriginal = 'margin: 10px 20px 10px 20px;';
const margin = 'margin:10px 20px;';
const gradientOriginal = 'background: linear-gradient(to bottom, #ffe500 0%, #ffe500 50%, #121 50%, #121 100%);';
const gradient = 'background:linear-gradient(to bottom,#ffe500 0%,#ffe500 50%,#121 50%,#121 100%);';
const gradient0 = 'background:linear-gradient(to bottom,#ffe500 0,#ffe500 50%,#121 50%,#121 100%);';
const gradientDeg = 'background:linear-gradient(180deg,#ffe500,#ffe500 50%,#121 0,#121);';
const gradientHex = 'background:linear-gradient(#ffe500 0% 50%,#121 50% 100%);';
const bgPostionPercent = 'background-position:100% 100%;';
const bgPositionWords = 'background-position:bottom right;';
const colorOriginal = 'color: #ff0000;';
const colorRed = 'color:red;';
const colorHex = 'color:#f00;';
const originalFontWeight = 'font-weight: 400;';
const fontWeight = 'font-weight:400;';
const originalQuotes = 'quotes: \'«\' "»";';
const quotesNoSpace = 'quotes:\'«\'"»";';
const quotes = 'quotes:"«" "»";';
const minWidth0 = 'min-width:0;';
const minWidthInit = 'min-width:initial;';
const closeQuote = '}';

const cssInput = [
  '/* normalize selectors */',
  h1Long + ' ' + h1.replace('{', ' {'),
  '    /* reduce shorthand even further */',
  '    ' + marginOriginal,
  '    /* reduce color values */',
  '    ' + colorOriginal,
  '    /* remove duplicated properties */',
  '    ' + originalFontWeight,
  '    ' + originalFontWeight,
  '    /* reduce position values */',
  '    ' + bgPositionWords.replace(':', ': '),
  '    /* normalize wrapping quotes */',
  '    ' + originalQuotes,
  '    /* reduce gradient parameters */',
  '    ' + gradientOriginal,
  '    /* replace initial values */',
  '    ' + minWidthInit.replace(':', ': '),
  '}',
  '/* correct invalid placement */',
  charset
].join('\n');

const smallestPossibleWhileLossless = [
  charset,
  h1,
  margin,
  colorRed,
  fontWeight,
  bgPostionPercent,
  quotesNoSpace,
  gradientHex
].join('');

const outputMap = {
  // 186
  crass: [
    h1,
    gradientDeg,
    bgPositionWords,
    colorRed,
    fontWeight,
    margin,
    minWidthInit,
    quotes.replace(';', ''),
    closeQuote
  ],
  // 194
  'css-nano': [
    charset,
    h1,
    margin,
    colorRed,
    fontWeight,
    bgPostionPercent,
    quotes,
    gradientDeg,
    minWidth0.replace(';', ''),
    closeQuote
  ],
  // 209
  csso: [
    h1Long,
    h1,
    margin,
    colorRed,
    fontWeight,
    bgPositionWords,
    originalQuotes.replace(': ', ':'),
    gradient0,
    minWidthInit.replace(';', ''),
    closeQuote
  ],
  // 211
  sqwish: [
    h1Long,
    h1,
    minWidthInit,
    gradient,
    originalQuotes.replace(': ', ':'),
    bgPositionWords,
    fontWeight,
    colorHex,
    margin.replace(';', ''),
    closeQuote
  ],
  // 214
  csswring: [
    h1,
    margin,
    colorRed,
    fontWeight,
    bgPositionWords,
    originalQuotes.replace(': ', ':'),
    gradient0,
    minWidthInit.replace(';', ''),
    closeQuote,
    charset.replace(';', '')
  ],
  // 153
  lightningcss: [
    h1Bad,
    h1,
    colorRed,
    quotes,
    minWidthInit,
    gradientHex,
    margin,
    fontWeight.replace(';', ''),
    closeQuote
  ],
  // 241
  sass: [
    utf16Encoding,
    h1Long,
    h1,
    marginOriginal.replace(': ', ':'),
    colorRed,
    fontWeight,
    fontWeight,
    bgPositionWords,
    quotes,
    gradientOriginal.replace(': ', ':'),
    minWidthInit.replace(';', ''),
    closeQuote
  ],
  // 244
  'css-condense': [
    charset,
    h1Long,
    h1,
    gradient,
    bgPositionWords,
    colorHex,
    fontWeight,
    fontWeight,
    margin,
    minWidthInit,
    originalQuotes.replace(': ', ':').replace(';', ''),
    closeQuote
  ],
  // 252
  'clean-css': [
    charset,
    h1Long,
    h1,
    marginOriginal.replace(': ', ':'),
    colorRed,
    fontWeight,
    fontWeight,
    bgPositionWords,
    originalQuotes.replace(': ', ':'),
    gradient0,
    minWidthInit.replace(';', ''),
    closeQuote
  ],
  // 252
  ncss: [
    h1Long,
    h1,
    marginOriginal.replace(': ', ':'),
    colorHex,
    fontWeight,
    fontWeight,
    bgPositionWords,
    quotesNoSpace,
    gradient0,
    minWidthInit.replace(';', ''),
    closeQuote,
    charset
  ],
  // 253
  ycssmin: [
    charset,
    h1Long,
    h1,
    marginOriginal.replace(': ', ':'),
    colorHex,
    fontWeight,
    fontWeight,
    bgPositionWords,
    originalQuotes.replace(': ', ':'),
    gradient0,
    minWidthInit.replace(';', ''),
    closeQuote
  ]
};


const longestNameSize = Object.keys(outputMap).sort(function (a, b) {
  return b.length - a.length;
})[0].length;
// Check how close they come to perfection
console.log('The smallest possible lossless size is ' + smallestPossibleWhileLossless.length + '.');
Object.keys(outputMap).forEach(function (key) {
  const outputSize = outputMap[key].join('').length;
  const smallest = smallestPossibleWhileLossless.length;
  const message = [
    key.padEnd(longestNameSize, ' ') + ' has a size of (' + outputSize + ') which is '
  ];
  if (outputSize < smallest) {
    message.push('smaller than is possible losslessly');
  } else if (outputSize > smallest) {
    const percent = ((((smallest / outputSize) * 100) - 100) * -1).toFixed(2) + '%';
    message.push(percent + ' larger than perfection');
  } else {
    message.push('is the same as the perfect output (though it may not have produced the perfect output, just a matching size)');
  }
  console.log(message.join(''));
});

test('integration tests', function (t) {
  t.plan(Object.keys(minifiers).length);

  Object.keys(minifiers).forEach(function (minifier) {
    Promise.resolve(minifiers[minifier](cssInput)).then(function (css) {
      t.equal(css, outputMap[minifier].join(''), 'Output length is ' + css.length + ' when using ' + minifier);
    }, function (err) {
      t.fail('Failure from engine "' + minifier + '": ' + String(err));
    });
  });
});

test('benchmark tests', function (t) {
  t.plan(Object.keys(minifiers).length);

  Object.keys(minifiers).forEach(function (m) {
    let minifier = minifiers[m];
    Promise.resolve(minifier.bench(cssInput)).then(function (time) {
      t.ok(time, minifier + ' took ' + time);
    }, function (err) {
      t.fail('Failure from engine "' + minifier + '": ' + String(err));
    });
  });
});

test('metadata tests', function (t) {
  t.plan(Object.keys(minifiers).length * 2);

  Object.keys(minifiers).forEach(function (m) {
    let minifier = minifiers[m];
    t.ok(minifier.version, minifier + ' version ' + minifier.version);
    t.ok('' + minifier, minifier + ' should be cast to string');
  });
});
