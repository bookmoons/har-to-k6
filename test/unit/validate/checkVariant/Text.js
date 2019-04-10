import test from 'ava'
import Text from 'validate/checkVariant/Text'
import { CheckCondition, CheckSubject, CheckType } from 'enum'
import { makeAssay } from 'aid'

test('missing subject', t => {
  t.throws(() => {
    Text({ type: CheckType.Text }, 0, 0, makeAssay())
  }, { name: 'MissingCheckSubject' })
})

test('missing condition', t => {
  t.throws(() => {
    Text({
      type: CheckType.Text,
      subject: CheckSubject.ResponseBody
    }, 0, 0, makeAssay())
  }, { name: 'MissingCheckCondition' })
})

test('invalid expression', t => {
  t.throws(() => {
    Text({
      type: CheckType.Text,
      subject: CheckSubject.ResponseHeaders,
      condition: CheckCondition.Contains,
      expression: 'user.id'
    }, 0, 0, makeAssay())
  }, { name: 'InvalidCheckExpression' })
})

test('missing value', t => {
  t.throws(() => {
    Text({
      type: CheckType.Text,
      subject: CheckSubject.HttpStatusCode,
      condition: CheckCondition.Equals
    }, 0, 0, makeAssay())
  }, { name: 'MissingCheckValue' })
})

test('valid', t => {
  t.notThrows(() => {
    Text({
      type: CheckType.Text,
      subject: CheckSubject.ResponseBody,
      condition: CheckCondition.Contains,
      value: 'Search Results'
    }, 0, 0, makeAssay())
  })
})
