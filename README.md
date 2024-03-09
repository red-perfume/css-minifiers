This repo was forked from Ben Briggs' `css-minifiers`. It has been tweaked for testing to determine what minifier to use in Red Perfume.

## Engine support

Engine                                                    | Stars | Runs | Size | Time (ms) | Notes
:--                                                       | --:   | :--: | :--  | --:       | :--
[clean-css](https://github.com/jakubpawlowicz/clean-css)  | 3,808 | ✅   | 252  | 8.52      | second largest in file size, slowest to run
[crass](https://github.com/mattbasta/crass)               |    98 | ✅   | 186  | 7.95      | Second smallest file size out of all tested, second slowest
[css-condense](https://github.com/rstacruz/css-condense)  |   209 | ✅   | 244  | 6.25      |
[css-smasher](https://github.com/MarkBennett/css-smasher) |     6 | ❌   |      |           | pretty rudimentary engine, one release from 7 years ago, not worth effort to get it to run
[cssnano](https://github.com/ben-eb/cssnano)              | 3,905 | ❌   | 194  |           | Verions 3 worked, but 5 now requires PostCSS to import a jungle with a gorrilla to get a banana
[csso](https://github.com/css/csso)                       | 3,334 | ✅   | 209  | 5.33      |
[cssshrink](https://github.com/stoyan/cssshrink)          | 1,073 | ❌   |      |           | It uses "latest" dependency versions that are incompatible with these benchmarks
[csswring](https://github.com/hail2u/node-csswring)       |   163 | ✅   | 214  | 4.40      |
[lightning](https://lightningcss.dev)                     | 5,631 | ✅   | 153  | 3.82      | Though written in Rust, no significant perfomance difference. Smallest output, but does so by discarding needed CSS, also retains CSS that is not needed. 
[more-css](https://github.com/army8735/more)              |    67 | ❌   |      |           | This is more like Less/Stylus, AKA a worse version of Sass, with no releases and no updates in 6 years
[ncss](https://github.com/wasche/ncss)                    |     7 | ✅   | 252  | 3.68      |
[sass](https://github.com/sass/dart-sass)                 | 2,534 | ✅   | 241  | 5.57      | Though Sass does a lot more, it can still just be used for CSS minification and is 3rd slowest
[sqwish](https://github.com/ded/sqwish)                   |   201 | ✅   | 211  | 1.66      | Second best speed, 5th best compression
[ycssmin](https://github.com/yui/ycssmin)                 |    52 | ✅   | 253  | 1.47      | largest file size out of all tested, also fastest to run


## Usage

`npm install && npm t`
