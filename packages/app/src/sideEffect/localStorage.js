import { read, write } from '~/service/localStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { read as readAction } from '~/store/action/localStorage'

const createPersist = (label, selector) => {
  let persisted = null

  return state => {
    const x = selector(state)

    if (x !== persisted) write(label, (persisted = x))
  }
}

export const init = store => {
  const persistUser = createPersist('pp-user', selectCurrentUser)

  const update = () => persistUser(store.getState())

  store.dispatch(readAction({ user: read('pp-user') }))

  update()

  store.subscribe(update)
}
