# gulp-append-query-string

Preventing caching of CSS / JS files

## Usage

``` bash
$ npm install gulp-query-string --save-dev
```

``` javascript
const appendQueryString = require('gulp-append-query-string');

gulp.task('default', () => {
  gulp.src('dist/**/*')
    .pipe(appendQueryString())
    .pipe(gulp.dest('dist'));
});
```

### Before

``` html
<link rel="stylesheet" href="styles/main.css">
<script src="scripts/main.js"></script>
```

### After

``` html
<link rel="stylesheet" href="styles/main.css?bvtfpbsv">
<script src="scripts/main.js?bvtfpbsv"></script>
```
