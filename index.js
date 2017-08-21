'use strict';

var Transform = require('readable-stream/transform');

module.exports = function (search, replacement, options) {
  return new Transform({
    objectMode: true,
    transform: function appendQueryStringTransform(file, enc, cb) {
      if (file.isNull()) {
        return cb(null, file);
      }

      function appendQueryString(contents, type, query) {
        const search = new RegExp("\\." + type + "\"", 'g')
        const replacement = '.' + type + '?' + query + '"'
        return new Buffer(String(contents).replace(search, replacement));
      }

      if (file.isBuffer()) {
        const query = Math.random().toString(36).slice(-8);
        file.contents = appendQueryString(file.contents, 'css', query);
        file.contents = appendQueryString(file.contents, 'js', query);
      }

      return cb(null, file);
    }
  });
};
