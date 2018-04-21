import { withUser } from '~/middleware/withUser'
import { findById } from '~/service/gcpDatastore/query'
import { parse } from '~/service/gcpDatastore/parse'

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

const pickRand = (arr, n) => {
  const u = arr.map((_, i) => i)

  const pick = []

  while (pick.length < n && u.length > 0)
    pick.push(arr[u.splice(Math.floor(Math.random() * u.length), 1)])

  return pick
}

const pickQuestions = questions => {
  const byCategory = {}

  questions.forEach(x =>
    (byCategory[x.category] = byCategory[x.category] || []).push(x)
  )

  const categories = Object.keys(byCategory)

  return () =>
    shuffle(
      shuffle(
        shuffle([].concat(...categories.map(c => pickRand(byCategory[c], 4))))
      )
    )
}

const getQuestions = async datastore => {
  const query = datastore.createQuery('question')
  const [raw_questions] = await datastore.runQuery(query)
  return raw_questions.map(parse(datastore))
}

const createSession_ = async (_, { sessionId }, { datastore, user }) => {
  if (!user) return new Error(401)

  const selectedQuestions = pickQuestions(await getQuestions(datastore))()

  const date_created = Date.now()

  const entities = [
    {
      key: datastore.key(['session', sessionId]),
      data: { userId: user.id, date_created },
    },
    ...selectedQuestions.map(({ id }, index) => ({
      key: datastore.key(['session', sessionId, 'line', id]),
      data: {
        index,
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
  const [line] = await findById(datastore, ['session', sessionId, 'line'])([
    lineId,
  ])

  if (!line) throw new Error(404, 'question not found')

  if (typeof line.answer == 'boolean')
    throw new Error(400, 'question already answered')

  const date_answered = Date.now()

  await datastore.update({
    key: datastore.key(['session', sessionId, 'line', lineId]),
    data: {
      index: line.index,
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
