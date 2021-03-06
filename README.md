# gulp-append-query-string

[![Build Status](https://travis-ci.org/onkbear/gulp-append-query-string.svg?branch=master)](https://travis-ci.org/onkbear/gulp-append-query-string)
[![npm version](https://badge.fury.io/js/gulp-append-query-string.svg)](https://badge.fury.io/js/gulp-append-query-string)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Preventing caching of CSS / JS files

## Usage

```bash
$ npm install gulp-query-string --save-dev
```

```javascript
const appendQueryString = require('gulp-append-query-string');

gulp.task('default', () => {
  gulp.src('index.html')
    .pipe(appendQueryString())
    .pipe(gulp.dest('.'));
});
```

Finding link and script tags then, append query string (random) to the end of path.

### Before

```html
<link rel="stylesheet" href="styles/main.css">
<script src="scripts/main.js"></script>
```

### After

```html
<link rel="stylesheet" href="styles/main.css?bvtfpbsv">
<script src="scripts/main.js?bvtfpbsv"></script>
```

### options

```javascript
gulp.task('default', () => {
  gulp.src('dist/**/*')
    .pipe(appendQueryString({
      css: false,   // default: true
      js: false,    // default: true
      length: 16    // default: 8
    }))
    .pipe(gulp.dest('dist'));
});
```

- `css` - Append to css (default: true)
- `js` - Append to js (default: true)
- `length` - Length of query (default: 8)

## License

[MIT](./LICENSE)
