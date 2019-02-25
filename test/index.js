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

test('append long query string', async t => {
  const {buf, stream} = await appendQueryString({
    length: 512
  })
  const file = await getStream.array(stream)

  t.true(file[0].contents.length === buf.length + 513 * 2)
})

test('append query string only CSS', async t => {
  const {buf, stream} = await appendQueryString({
    css: true,
    js: false
  })
  const file = await getStream.array(stream)

  t.true(file[0].contents.length === buf.length + 9)
})

test('append query string only JS', async t => {
  const {buf, stream} = await appendQueryString({
    css: false,
    js: true
  })
  const file = await getStream.array(stream)

  t.true(file[0].contents.length === buf.length + 9)
})
