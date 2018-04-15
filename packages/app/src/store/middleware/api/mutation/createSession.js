import fetch from '~/service/fetch'
import { API_ORIGIN } from '~/config'
import { selectCurrentUserId } from '~/store/selector/currentUser'
import { normalize } from '~/service/normalize'

export const actionType = 'mutation:session:create'

export const exec = async (store, action) => {
  const query = `
    mutation a($sessionId: ID!) {
      createSession(sessionId: $sessionId) {
        id
        lines {
          question{
            id
            text
            category
          }
          answer
        }
      }
    }
  `

  const variables = {
    $sessionId: action.sessionId,
    sessionId: action.sessionId,
  }

  return fetch(`${API_ORIGIN}/graphql`, {
    method: 'POST',
    body: { query, variables },
    userId: selectCurrentUserId(store.getState()),
  })
}

export const optimisticUpdate = (cache, action) => ({
  ...cache,
  [`session.${action.sessionId}`]: { id: action.sessionId, liens: [] },
})

export const update = (cache, action, { data }) => ({
  ...cache,
  ...normalize({ session: data.createSession }),
})
