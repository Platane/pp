import { withUser } from '~/middleware/withUser'

const submitQuestion_ = async (_, { question }, { datastore, user }) => {
  if (!user) return new Error(401)

  const date_created = Date.now()

  await datastore.save({
    key: datastore.key(['submited_question']),
    data: { question, userId: user.id, date_created },
  })

  return true
}

export const submitQuestion = withUser(submitQuestion_)
