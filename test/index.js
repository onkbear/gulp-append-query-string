import fs from 'fs'
import gaqs from '..'
import getStream from 'get-stream'
import gutil from 'gulp-util'
import test from 'ava'

const appendQueryString = async plugins => {
  const buf = await fs.readFileSync('test/sample.html')
  var stream = gaqs(plugins)
  stream.end(new gutil.File({
    contents: buf
  }))

  return {buf, stream}
}

test('append query string', async t => {
  const {buf, stream} = await appendQueryString()
  const file = await getStream.array(stream)

  t.true(file[0].contents.length === buf.length + 9 * 2)
})
