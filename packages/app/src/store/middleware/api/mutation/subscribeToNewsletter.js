import fetch from '~/service/fetch'
import { API_ORIGIN } from '~/config'
import { selectCurrentUserId } from '~/store/selector/currentUser'
import { normalize } from '~/service/normalize'

export const actionType = 'mutation:user:subscribeToNewsletter'

export const exec = (store, action) => {
  const query = `
    mutation a($email: String!) {
      subscribeToNewsletter(email: $email)
    }
  `

  const variables = {
    email: action.email,
  }

  return fetch(`${API_ORIGIN}/graphql`, {
    method: 'POST',
    body: { query, variables },
    userId: selectCurrentUserId(store.getState()),
  })
}

export const update = cache => cache
