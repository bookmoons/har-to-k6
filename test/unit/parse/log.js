import test from 'ava'
import isolate from 'helper/isolate'
import { makeResult } from 'aid'
const [ log, { creator, entries, pages } ] =
  isolate(test, 'parse/log', {
    browser: 'parse/browser',
    creator: 'parse/creator',
    entries: 'parse/entries',
    pages: 'parse/pages'
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

test.serial('comment', t => {
  const result = makeResult()
  log({ comment: 'Sent from my iPad' }, result)
  t.is(result.comment[1], 'Sent from my iPad')
})

test.serial('creator', t => {
  log({ creator: {} }, makeResult())
  t.true(creator.calledOnce)
})

test.serial('pages', t => {
  log({ pages: [] }, makeResult())
  t.true(pages.calledOnce)
})

test.serial('entries', t => {
  log({ entries: [] }, makeResult())
  t.true(entries.calledOnce)
})
