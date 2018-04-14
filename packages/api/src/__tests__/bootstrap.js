import { connect as createDB } from '~/service/gcpDatastore'

const questions = [
  { id: 'aaaa', category: 'funding_round', text: 'aaaa' },
  { id: 'bbbb', category: 'funding_round', text: 'bbbb' },
  { id: 'cccc', category: 'funding_round', text: 'cccc' },
  { id: 'dddd', category: 'funding_round', text: 'dddd' },
  { id: 'eeee', category: 'funding_round', text: 'eeee' },
  { id: 'ffff', category: 'funding_round', text: 'ffff' },
]

const sessions = [
  {
    id: 'aaaa',
    userId: 'aaaa',
    lines: [
      {
        answer: true,
        date_answered: new Date('03-01-2017'),
        questionId: questions[0].id,
      },
      {
        answer: false,
        date_answered: new Date('03-01-2017'),
        questionId: questions[1].id,
      },
      {
        answer: true,
        date_answered: new Date('04-01-2017'),
        questionId: questions[2].id,
      },
      {
        questionId: questions[4].id,
      },
      {
        questionId: questions[5].id,
      },
    ],
    date_created: new Date('03-01-2017'),
  },
]

const getAll = datastore => async entityName => {
  const query = datastore.createQuery(entityName)

  const [results] = await datastore.runQuery(query)

  return results
}

export const run = async () => {
  const datastore = await createDB()

  console.log('---flush')

  const entities = [].concat(
    ...(await Promise.all(['question', 'session'].map(getAll(datastore))))
  )

  await datastore.delete(entities.map(x => x[datastore.KEY]))

  console.log('---questions')

  await datastore.save(
    questions.map(o => ({
      key: datastore.key(['question', o.id]),
      data: o,
    }))
  )

  console.log('---session')

  await datastore.save(
    sessions.map(o => ({
      key: datastore.key(['session', o.id]),
      data: o,
    }))
  )
}
