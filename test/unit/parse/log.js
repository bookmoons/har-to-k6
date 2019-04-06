import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
import { makeResult } from 'aid'
const entries = sinon.stub()
const pages = sinon.stub()
let log

test.before(t => {
  mockRequire('../../../src/parse/entries', entries)
  mockRequire('../../../src/parse/pages', pages)
  log = require('parse/log')
})

test.afterEach.always(t => {
  entries.reset()
  pages.reset()
})

test.serial('version explicit', t => {
  const result = makeResult()
  log({ version: '1.2' }, result)
  t.is(result.comment[0], 'Converted from HAR v1.2 archive')
})

test.serial('version default', t => {
  const result = makeResult()
  log({}, result)
  t.is(result.comment[0], 'Converted from HAR v1.1 archive')
})

test.serial('creator name', t => {
  const result = makeResult()
  log({ creator: { name: 'WebTracer' } }, result)
  t.is(result.comment[1], 'Creator: WebTracer')
})

test.serial('creator version', t => {
  const result = makeResult()
  log({ creator: { name: 'WebTracer', version: '2' } }, result)
  t.is(result.comment[1], 'Creator: WebTracer 2')
})

test.serial('creator comment', t => {
  const result = makeResult()
  log({
    creator: { name: 'WebTracer', comment: 'Recorded 2015-04-07' }
  }, result)
  t.is(result.comment[1], [
    'Creator: WebTracer',
    'Recorded 2015-04-07'
  ].join('\n'))
})

test.serial('browser name', t => {
  const result = makeResult()
  log({ browser: { name: 'Brave' } }, result)
  t.is(result.comment[1], 'Browser: Brave')
})

test.serial('browser version', t => {
  const result = makeResult()
  log({ browser: { name: 'Brave', version: '1' } }, result)
  t.is(result.comment[1], 'Browser: Brave 1')
})

test.serial('browser comment', t => {
  const result = makeResult()
  log({
    browser: { name: 'Brave', comment: 'Developer build 20190103' }
  }, result)
  t.is(result.comment[1], [
    'Browser: Brave',
    'Developer build 20190103'
  ].join('\n'))
})

test.serial('comment', t => {
  const result = makeResult()
  log({ comment: 'Sent from my iPad' }, result)
  t.is(result.comment[1], 'Sent from my iPad')
})

test.serial('pages', t => {
  const result = makeResult()
  log({ pages: [] }, result)
  t.true(pages.calledOnce)
})

test.serial('entries', t => {
  const result = makeResult()
  log({ entries: [] }, result)
  t.true(entries.calledOnce)
})