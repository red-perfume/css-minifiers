This repo was forked from Ben Briggs' `css-minifiers`. It has been tweaked for testing to determine what minifier to use in Red Perfume.

## Engine support

Engine                                                    | Stars | Runs | Size | Time (ms) | Notes
:--                                                       | --:   | :--  | :--  | --:       | :--
[clean-css](https://github.com/jakubpawlowicz/clean-css)  | 3,808 | ✅   | 252  | 16.00     | second largest in file size, slowest to run
[crass](https://github.com/mattbasta/crass)               |    98 | ✅   | 186  | 15.00     | Smallest file size out of all tested, second slowest
[css-condense](https://github.com/rstacruz/css-condense)  |   209 | ✅   | 244  | 12.00     |
[css-smasher](https://github.com/MarkBennett/css-smasher) |     6 | ❌   |      |           | pretty rudimentary engine, one release from 7 years ago, not worth effort to get it to run
[cssnano](https://github.com/ben-eb/cssnano)              | 3,905 | ❌   | 194  |           | Verions 3 worked, but 5 now requires PostCSS to import a jungle with a gorrilla to get a banana
[csso](https://github.com/css/csso)                       | 3,334 | ✅   | 209  | 10.00     |
[cssshrink](https://github.com/stoyan/cssshrink)          | 1,073 | ❌   |      |           | It uses "latest" dependency versions that are incompatible with it
[csswring](https://github.com/hail2u/node-csswring)       |   163 | ✅   | 214  | 8.77      |
[more-css](https://github.com/army8735/more)              |    67 | ❌   |      |           | This is more like Less/Stylus, AKA a worse version of Sass, with no releases and no updates in 6 years
[ncss](https://github.com/wasche/ncss)                    |     7 | ✅   | 252  | 7.69      |
[sass](https://github.com/sass/dart-sass)                 | 2,534 | ✅   | 241  | 13.00     | Though Sass does a lot more, it can still just be used for CSS minification and is 3rd slowest
[sqwish](https://github.com/ded/sqwish)                   |   201 | ✅   | 211  | 4.30      | Second best speed, 4th best compression
[ycssmin](https://github.com/yui/ycssmin)                 |    52 | ✅   | 253  | 3.95      | largest file size out of all tested, also fastest to run

If you've written a minifier that you'd like to add to this list, please send a pull request!


## Usage

`npm install && npm t`
