import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
const log = sinon.stub()
let root

test.before(t => {
  mockRequire('../../../src/validate/log', log)
  root = require('validate/root')
})

test.afterEach.always(t => {
  log.reset()
})

test.serial('missing root', t => {
  t.throws(() => {
    root()
  }, { name: 'MissingRoot' })
})

test.serial('missing log', t => {
  t.throws(() => {
    root({})
  }, { name: 'MissingLog' })
})

test.serial('invalid log', t => {
  t.throws(() => {
    root({ log: 5 })
  }, { name: 'InvalidLog' })
})

test.serial('success', t => {
  t.notThrows(() => {
    root({ log: {} })
  })
})
