import fetch from '~/service/fetch'
import { success, failure } from '~/store/action/resourceFetcher'
import { API_ORIGIN } from '~/config'

const fetchSession = sessionId => {
  const query = `{
    session(id:"${sessionId}"){
      id 
      lines {
        question {
          id
          text
          category
        }
        answer
      }
    }
  }`

  return fetch(`${API_ORIGIN}/graphql`, {
    method: 'POST',
    body: { query },
  })
}

export const init = store => {
  const count = {}
  const done = {}

  const update = async () => {
    const state = store.getState()

    const [next] = state.resource.toFetch.filter(x => !done[x.requestKey])

    if (!next) return

    done[next.requestKey] = Date.now()

    const [entity, id] = next.key.split('.', 2)

    let promise

    switch (entity) {
      case 'session':
        promise = fetchSession(id)
        break
    }

    if (!promise) return

    await promise
      .then(res => store.dispatch(success(res, next)))
      .catch(error => store.dispatch(failure(error, next)))

    update()
  }

  update()

  store.subscribe(update)
}
