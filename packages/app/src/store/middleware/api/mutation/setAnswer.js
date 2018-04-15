import fetch from '~/service/fetch'
import { API_ORIGIN } from '~/config'
import { selectCurrentUserId } from '~/store/selector/currentUser'
import { normalize } from '~/service/normalize'

export const actionType = 'mutation:answer:set'

export const exec = async (store, action) => {
  const query = `
    mutation a($sessionId: ID!, $lineId: ID!, $answer: Boolean!) {
      setAnswer(sessionId: $sessionId, lineId: $lineId, answer: $answer) {
        question{
          id
          text
          category
        }
        answer
      }
    }
  `

  const variables = {
    sessionId: action.sessionId,
    lineId: action.lineId,
    answer: action.answer,
  }

  return fetch(`${API_ORIGIN}/graphql`, {
    method: 'POST',
    body: { query, variables },
    userId: selectCurrentUserId(store.getState()),
  })
}

export const optimisticUpdate = (cache, { sessionId, lineId, answer }) => ({
  ...cache,
  [`session.${sessionId}.line.${lineId}`]: {
    question: `question.${lineId}`,
    answer,
  },
})

export const update = (cache, { sessionId, lineId }, { data }) => ({
  ...cache,
  [`session.${sessionId}.line.${lineId}`]: {
    question: `question.${lineId}`,
    answer: data.setAnswer.answer,
  },
})
