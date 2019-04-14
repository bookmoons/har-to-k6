import test from 'ava'
import isolate from 'helper/isolate'
const [ group, { block, comment, entries } ] =
  isolate(test, 'render/group', {
    block: 'render/block',
    comment: 'render/comment',
    entries: 'render/entries'
  })

test.serial('implicit', t => {
  entries.returns(`// Entries`)
  block.returns(`{
  // Entries
}`)
  const pages = new Map()
  const result = group(pages, { id: 'page1', entries: [] })
  t.is(result, `group("page1", function() {
  // Entries
});`)
  t.true(entries.calledOnce)
  t.true(block.calledOnce)
})

test.serial('explicit', t => {
  entries.returns(`// Entries`)
  block.returns(`{
  // Entries
}`)
  const pages = new Map().set('page1', { name: 'Page 1', index: 0 })
  const result = group(pages, { id: 'page1', entries: [] })
  t.is(result, `group("Page 1", function() {
  // Entries
});`)
})

test.serial('comment', t => {
  entries.returns(`// Entries`)
  block.returns(`{
  // Entries
}`)
  comment.returns(`// Member section`)
  const pages = new Map()
    .set('page1', { name: 'Page 1', index: 0, comment: 'Member section' })
  const result = group(pages, { id: 'page1', entries: [] })
  t.is(result, `// Member section
group("Page 1", function() {
  // Entries
});`)
})
