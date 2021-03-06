const block = require('./block')
const comment = require('./comment')
const entries = require('./entries')
const string = require('./string')

function group (pages, scope) {
  if (pages.has(scope.id)) {
    const page = pages.get(scope.id)
    const name = page.name || scope.id
    const content = [ entries(scope.entries) ]
    return [
      header(page),
      `group(${string(name)}, function() ${block(content)});`
    ].filter(item => item).join(`\n`)
  } else {
    const name = scope.id
    const content = [ entries(scope.entries) ]
    return `group(${string(name)}, function() ${block(content)});`
  }
}

function header (page) {
  if (page.comment) {
    return comment(page.comment)
  } else {
    return null
  }
}

module.exports = group
