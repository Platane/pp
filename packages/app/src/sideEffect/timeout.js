import { setAnswer } from '~/store/action/mutation'
import { selectCurrentLineId } from '~/store/selector/currentLine'
import { selectCurrentSessionId } from '~/store/selector/currentSession'

export const init = store => {
  let killTimeout

  let lastStartDate = null

  const createTrigger = (sessionId, lineId) => () =>
    store.dispatch(setAnswer(sessionId, lineId, false))

  const update = async () => {
    const state = store.getState()

    const startDate = state.timeout.startDate

    if (lastStartDate != startDate) {
      clearTimeout(killTimeout)

      if (!startDate) return

      const delta = startDate + state.timeout.duration - Date.now()

      killTimeout = setTimeout(
        createTrigger(
          selectCurrentSessionId(state),
          selectCurrentLineId(state)
        ),
        Math.max(delta, 1)
      )
    }
  }

  update()

  store.subscribe(update)
}
