import { connect as createDB } from '~/service/gcpDatastore'
import { questions, sessions } from './__fixtures__'

const getAll = datastore => async entityName => {
  const query = datastore.createQuery(entityName)

  const [results] = await datastore.runQuery(query)

  return results
}

const split = n => arr =>
  Array.from({ length: Math.ceil(arr.length / n) }).map((_, i) =>
    arr.slice(i * n, (i + 1) * n)
  )

export const run = async () => {
  const datastore = await createDB()

  console.log('---flush')

  const entities = [].concat(
    ...(await Promise.all(
      ['question', 'session', 'line', 'user', 'submited_question'].map(
        getAll(datastore)
      )
    ))
  )

  await Promise.all(
    split(500)(entities.map(x => x[datastore.KEY])).map(keys =>
      datastore.delete(keys)
    )
  )

  console.log('---questions')

  await datastore.save(
    questions.map(o => ({
      key: datastore.key(['question', o.id]),
      data: o,
    }))
  )

  console.log('---session')

  await datastore.save(
    [].concat(
      ...sessions.map(session => [
        {
          key: datastore.key(['session', session.id]),
          data: { userId: session.userId, date_created: session.date_created },
        },
        ...session.lines.map((l, index) => ({
          key: datastore.key(['session', session.id, 'line', l.question.id]),
          data: {
            index,
            answer: l.answer,
            date_answered: l.date_answered,
          },
        })),
      ])
    )
  )
}
