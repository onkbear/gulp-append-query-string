'use strict'

const Transform = require('readable-stream/transform')
global.Buffer = require('buffer').Buffer

function appendQueryString (contents, type, query) {
  const search = new RegExp('\\.' + type + '"', 'g')
  const replacement = '.' + type + '?' + query + '"'
  return global.Buffer.from(String(contents).replace(search, replacement))
}

function createRandomString (length) {
  let str = ''
  while (str.length < length) {
    str += Math.random().toString(36).substr(2)
  }
  return str.substr(0, length)
}

module.exports = function (options = {}) {
  return new Transform({
    objectMode: true,
    transform: function appendQueryStringTransform (file, enc, cb) {
      if (file.isNull()) {
        return cb(null, file)
      }

      const isCSS = 'css' in options ? options.css : true
      const isJS = 'js' in options ? options.js : true
      const length = 'length' in options ? options.length : 8

      if (file.isBuffer()) {
        const query = createRandomString(length)
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
