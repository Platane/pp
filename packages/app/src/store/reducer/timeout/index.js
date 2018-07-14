import { selectCurrentLineId } from '~/store/selector/currentLine'
import { set } from '~/util/reduxHelper'

const DURATION = 10000

export const defaultState = {
  duration: DURATION,
  status: 'empty',
}

const getStatus = (state): 'empty' | 'paused' | 'running' => {
  const lineId = selectCurrentLineId(state)

  if (!lineId) return 'empty'

  const q = state.router.query

  const paused =
    q.subscribe || q.break || q.result || q.subscribeok || q.submitquestion

  if (paused) return 'paused'

  return 'running'
}

export const reduce = state => state || defaultState

export const enhance = reduce => (state, action) => {
  const previousLineId = selectCurrentLineId(state)
  const previousTimeout = state.timeout

  state = reduce(state, action)

  const nextLineId = selectCurrentLineId(state)

  const status = getStatus(state)

  // change
  if (nextLineId != previousLineId || status != state.timeout.status) {
    const nextTimeout = { status, duration: DURATION }

    if (status === 'running') {
      // another line, reset the timer
      if (nextLineId != previousLineId) nextTimeout.startDate = Date.now()
      // previous line was paused, un-pause it
      else if (previousTimeout.status === 'paused')
        nextTimeout.startDate = Date.now() - previousTimeout.pausedAt
      // wtf should never happen
      else nextTimeout.startDate = Date.now()
    } else if (status === 'paused') {
      if (previousTimeout.status === 'running')
        nextTimeout.pausedAt = Date.now() - previousTimeout.startDate
      // wtf should never happen
      else nextTimeout.pausedAt = 0
    }

    state = {
      ...state,
      timeout: nextTimeout,
    }
  }

  return state
}
