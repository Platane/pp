import { withUser } from '~/middleware/withUser'

const subscribeToNewsletter_ = async (_, { email }, { datastore, user }) => {
  if (!user) return new Error(401)

  const date_created = Date.now()

  await datastore.save({
    key: datastore.key(['user', user.id]),
    data: { email, date_created },
  })

  return true
}

export const subscribeToNewsletter = withUser(subscribeToNewsletter_)
