import test from 'tape'

import { waitFor } from '~/__tests__/util/waitFor'

import { create } from '~/store/index'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

import { selectCurrentSession } from '~/store/selector/currentSession'
import { selectCurrentLineId } from '~/store/selector/currentLine'
import { createSession, setAnswer } from '~/store/action/mutation'
import { goTo } from 'declarative-router/lib/redux/action'

let sessionId
let session_created
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

  session_created = session
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

  t.deepEqual(
    session.lines.map(x => x.question.id),
    session_created.lines.map(x => x.question.id),
    'should have the same line order as created'
  )

  t.deepEqual(
    session,
    session_created,
    'should have the exact same session as created'
  )

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

  // anser more for next test

  for (let i = 5; i--; ) {
    store.dispatch(
      setAnswer(sessionId, selectCurrentLineId(store.getState()), true)
    )
    await waitFor(store, ({ resource }) => !resource.pendingMutations.length)
  }

  t.end()
})

test('retrieve question answered', async t => {
  const store = create([initResourceFetcher])
  store.dispatch(goTo(`/session/${sessionId}`))

  const session = await waitFor(store, selectCurrentSession)

  t.deepEqual(
    session.lines.map(x => x.question.id),
    session_created.lines.map(x => x.question.id),
    'should have the same line order as created'
  )

  t.assert(session.lines[0], 'should have the first line answered')

  t.end()
})
