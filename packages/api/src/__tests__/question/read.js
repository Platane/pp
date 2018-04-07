import test from 'tape'
import fetch from '../util/fetch'
import type { Question } from '~/type'

test('get all questions', async t => {
  const questions = await fetch('/question')

  t.pass('request ok')

  t.assert(questions.length > 0, 'have some questions')

  t.assert(
    questions.every(q => Question.assert(q)),
    'questions have correct type'
  )

  t.end()
})
