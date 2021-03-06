import test from 'ava'
import isolate from 'helper/isolate'
const [ logic, { block, declares, external, groups, variableSpace } ] =
  isolate(test, 'render/logic', {
    block: 'render/block',
    declares: 'render/declares',
    external: 'render/external',
    groups: 'render/groups',
    variableSpace: 'render/variableSpace'
  })

test.serial('empty', t => {
  block.returns('{}')
  const result = logic({})
  t.is(result, 'export default function() {}')
  t.true(declares.calledOnce)
  t.true(variableSpace.calledOnce)
  t.true(external.calledOnce)
  t.true(groups.calledOnce)
  t.true(block.calledOnce)
  t.deepEqual(block.firstCall.args[0], [])
})

test.serial('external', t => {
  external.returns(`// External entries`)
  block.returns(`{
  // External entries
}`)
  const result = logic({})
  t.is(result, `export default function() {
  // External entries
}`)
  t.true(declares.calledOnce)
  t.true(variableSpace.calledOnce)
  t.true(external.calledOnce)
  t.true(groups.calledOnce)
  t.true(block.calledOnce)
  t.deepEqual(block.firstCall.args[0], [ '// External entries' ])
})

test.serial('groups', t => {
  groups.returns(`// Groups`)
  block.returns(`{
  // Groups
}`)
  const result = logic({})
  t.is(result, `export default function() {
  // Groups
}`)
  t.true(declares.calledOnce)
  t.true(variableSpace.calledOnce)
  t.true(external.calledOnce)
  t.true(groups.calledOnce)
  t.true(block.calledOnce)
  t.deepEqual(block.firstCall.args[0], [ '// Groups' ])
})
