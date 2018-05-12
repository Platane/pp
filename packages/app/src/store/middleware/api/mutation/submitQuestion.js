import fetch from '~/service/fetch'
import { API_ORIGIN } from '~/config'
import { selectCurrentUserId } from '~/store/selector/currentUser'
import { normalize } from '~/service/normalize'

export const actionType = 'mutation:user:submitQuestion'

export const exec = (store, action) => {
  const query = `
    mutation a($question: String!) {
      submitQuestion(question: $question)
    }
  `

  const variables = {
    question: action.question,
  }

  return fetch(`${API_ORIGIN}/graphql`, {
    method: 'POST',
    body: { query, variables },
    userId: selectCurrentUserId(store.getState()),
  })
}

export const update = cache => cache
