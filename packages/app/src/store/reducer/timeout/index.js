import { selectCurrentLineId } from '~/store/selector/currentLine'
import { set } from '~/util/reduxHelper'

export const defaultState = { duration: 10000, startDate: null }

export const reduce = state => state || defaultState

export const enhance = reduce => (state, action) => {
  const previousLineId = selectCurrentLineId(state)

  state = reduce(state, action)

  const nextLineId = selectCurrentLineId(state)

  if (nextLineId != previousLineId)
    state = set(state, ['timeout', 'startDate'], nextLineId && Date.now())

  return state
}
