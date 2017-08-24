'use strict'

var Transform = require('readable-stream/transform')

module.exports = function (options) {
  if (options === undefined) {
    options = {}
  }
  return new Transform({
    objectMode: true,
    transform: function appendQueryStringTransform (file, enc, cb) {
      if (file.isNull()) {
        return cb(null, file)
      }

      function appendQueryString (contents, type, query) {
        const search = new RegExp('\\.' + type + '"', 'g')
        const replacement = '.' + type + '?' + query + '"'
        return Buffer.from(String(contents).replace(search, replacement))
      }

      const isCSS = 'css' in options ? options.css : true
      const isJS = 'js' in options ? options.js : true

      if (file.isBuffer()) {
        const query = Math.random().toString(36).slice(-8)
        if (isCSS) {
          file.contents = appendQueryString(file.contents, 'css', query)
        }
        if (isJS) {
          file.contents = appendQueryString(file.contents, 'js', query)
        }
      }

      return cb(null, file)
    }
  })
}
