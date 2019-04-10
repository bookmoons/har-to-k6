const checkVariant = require('./checkVariant')
const { empty } = require('../aid')
const {
  CheckConditionEncoding,
  CheckSubjectEncoding,
  CheckTypeEncoding
} = require('../enum')
const { InvalidArchiveError } = require('../error')

/*
 * type: required CheckType
 * subject: optional CheckSubject
 * condition: optional CheckCondition
 * expression: optional string
 * value: optional string
 * comment: optional string
 */
function check (node, i, j, assay) {
  validate(node, i, j)
  checkVariant[CheckTypeEncoding.get(node.type)](node, i, j, assay)
}

function validate (node, i, j) {
  if (empty(node.type)) {
    throw new InvalidArchiveError(
      { name: 'MissingCheckType' },
      `Missing check type (${i}:${j})`
    )
  }
  if (!CheckTypeEncoding.has(node.type)) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckType' },
      `Invalid check type (${i}:${j}): ${node.type}`
    )
  }
  if (!(empty(node.subject) || CheckSubjectEncoding.has(node.subject))) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckSubject' },
      `Invalid check subject (${i}:${j}): ${node.subject}`
    )
  }
  if (!(empty(node.condition) || CheckConditionEncoding.has(node.condition))) {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckCondition' },
      `Invalid check condition (${i}:${j}): ${node.condition}`
    )
  }
  if (node.expression && typeof node.expression !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckExpression' },
      `Invalid check expression (${i}:${j}): must be string`
    )
  }
  if (node.value && typeof node.value !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidCheckValue' },
      `Invalid check value (${i}:${j}): must be string`
    )
  }
  if (node.comment && typeof node.comment !== 'string') {
    throw new InvalidArchiveError(
      { name: 'InvalidComment' },
      `Invalid check comment (${i}:${j}): must be string`
    )
  }
}

module.exports = check
