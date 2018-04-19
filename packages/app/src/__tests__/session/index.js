import test from 'tape'

import { waitFor } from '~/__tests__/util/waitFor'

import { create } from '~/store/index'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

import { selectCurrentSession } from '~/store/selector/currentSession'
import { selectCurrentLineId } from '~/store/selector/currentLine'
import { createSession, setAnswer } from '~/store/action/mutation'
import { goTo } from 'declarative-router/lib/redux/action'

let sessionId
test('create session', async t => {
  const store = create([initResourceFetcher])

  t.assert(
    !selectCurrentSession(store.getState()),
    'at first there is not session selected'
  )

  t.pass('throw "createSession" action')

  store.dispatch(createSession())

  const session = await waitFor(store, selectCurrentSession)

  t.assert(session, 'should have session created')

  t.assert(session.lines.length, 'session should have lines')

  sessionId = session.id

  t.end()
})

test('retrieve session', async t => {
  const store = create([initResourceFetcher])

  t.assert(
    !selectCurrentSession(store.getState()),
    'at first there is not session selected'
  )

  t.pass('navigate to the session')

  store.dispatch(goTo(`/session/${sessionId}`))

  const session = await waitFor(store, selectCurrentSession)

  t.assert(session, 'session should be fetched')

  t.assert(session.lines.length, 'session should have lines')

  t.end()
})

test('answer question', async t => {
  const store = create([initResourceFetcher])
  store.dispatch(goTo(`/session/${sessionId}`))

  await waitFor(store, selectCurrentSession)

  const lineId = selectCurrentLineId(store.getState())

  t.assert(lineId, 'should have a line selected')

  store.dispatch(setAnswer(sessionId, lineId, true))

  t.assert(
    selectCurrentSession(store.getState()).lines.find(
      x => x.question.id === lineId
    ).answer,
    'should have line answered'
  )

  t.assert(
    store.getState().resource.pendingMutations.length,
    'should have mutation pending'
  )

  await waitFor(store, ({ resource }) => !resource.pendingMutations.length)

  t.pass('mutation should end')

  t.assert(
    selectCurrentSession(store.getState()).lines.find(
      x => x.question.id === lineId
    ).answer,
    'should still have line answered'
  )

  t.end()
})
