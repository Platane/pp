import { withUser } from '~/middleware/withUser'
import { findById } from '~/service/gcpDatastore/query'
import { parse } from '~/service/gcpDatastore/parse'

const pickQuestions = questions => questions.slice(0, 10)

const getQuestions = async datastore => {
  const query = datastore.createQuery('question')
  const [raw_questions] = await datastore.runQuery(query)
  return raw_questions.map(parse(datastore))
}

const createSession_ = async (_, { sessionId }, { datastore, user }) => {
  if (!user) return new Error(401)

  const selectedQuestions = pickQuestions(await getQuestions(datastore))

  const date_created = Date.now()

  const entities = [
    {
      key: datastore.key(['session', sessionId]),
      data: { userId: user.id, date_created },
    },
    ...selectedQuestions.map(({ id }) => ({
      key: datastore.key(['session', sessionId, 'line', id]),
      data: {
        answer: null,
        date_answered: null,
      },
    })),
  ]

  await datastore.save(entities)

  return {
    id: sessionId,
    date_created,
    lines: selectedQuestions.map(question => ({ question })),
  }
}

export const createSession = withUser(createSession_)

export const setAnswer = async (
  _,
  { sessionId, lineId, answer },
  { datastore }
) => {
  const line = await findById(datastore, ['session', sessionId, 'line'])([
    lineId,
  ])

  if (!line) throw new Error(404, 'question not found')

  if (typeof line.answer == 'boolean')
    throw new Error(400, 'question already answered')

  const date_answered = Date.now()

  await datastore.save({
    key: datastore.key(['session', sessionId, 'line', lineId]),
    data: {
      date_answered,
      answer,
    },
  })

  return {
    id: lineId,
    date_answered,
    answer,
    question: (await findById(datastore, ['question'])([lineId]))[0],
  }
}
