import test from 'ava'
import isolate from 'helper/isolate'
import { assay as makeAssay } from 'make'
const [ entry, { checks, request, variables } ] =
  isolate(test, 'validate/entry', {
    checks: 'validate/checks',
    request: 'validate/request',
    variables: 'validate/variables'
  })

test.serial('invalid pageref', t => {
  t.throws(() => {
    entry({ pageref: 5 }, 0, makeAssay())
  }, { name: 'InvalidEntryPageref' })
})

test.serial('missing index', t => {
  t.throws(() => {
    entry({}, 0, makeAssay())
  }, { name: 'MissingEntryIndex' })
})

test.serial('invalid index', t => {
  t.throws(() => {
    entry({ index: 'two' }, 0, makeAssay())
  }, { name: 'InvalidEntryIndex' })
})

test.serial('duplicate index external', t => {
  const assay = makeAssay()
  entry({ index: 3, request: {} }, 0, assay)
  t.throws(() => {
    entry({ index: 3, request: {} }, 1, assay)
  }, { name: 'DuplicateEntryIndex' })
})

test.serial('duplicate index page', t => {
  const assay = makeAssay()
  entry({ index: 3, request: {}, pageref: 'page1' }, 0, assay)
  t.throws(() => {
    entry({ index: 3, request: {}, pageref: 'page1' }, 1, assay)
  }, { name: 'DuplicateEntryIndex' })
})

test.serial('missing request', t => {
  t.throws(() => {
    entry({ index: 0 }, 0, makeAssay())
  }, { name: 'MissingEntryRequest' })
})

test.serial('invalid request', t => {
  t.throws(() => {
    entry({ index: 0, request: 5 }, 0, makeAssay())
  }, { name: 'InvalidEntryRequest' })
})

test.serial('invalid checks', t => {
  t.throws(() => {
    entry({ index: 0, request: {}, checks: 5 }, 0, makeAssay())
  }, { name: 'InvalidEntryChecks' })
})

test.serial('invalid variables', t => {
  t.throws(() => {
    entry({ index: 0, request: {}, variables: 5 }, 0, makeAssay())
  }, { name: 'InvalidEntryVariables' })
})

test.serial('invalid comment', t => {
  t.throws(() => {
    entry({ index: 0, request: {}, comment: 5 }, 0, makeAssay())
  }, { name: 'InvalidComment' })
})

test.serial('valid minimal', t => {
  entry({ index: 0, request: {} }, 0, makeAssay())
  t.true(request.calledOnce)
  t.true(checks.notCalled)
  t.true(variables.notCalled)
})

test.serial('valid maximal', t => {
  entry({
    index: 0,
    request: {},
    pageref: 'page1',
    checks: [],
    variables: [],
    comment: 'Apple a day'
  }, 0, makeAssay())
  t.true(request.calledOnce)
  t.true(checks.calledOnce)
  t.true(variables.calledOnce)
})
