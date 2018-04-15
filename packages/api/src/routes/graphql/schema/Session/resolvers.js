import { parse } from '~/service/gcpDatastore/parse'
import { findById } from '~/service/gcpDatastore/query'

export const lines = async ({ id }, _, { datastore }) => {
  const query = datastore
    .createQuery('line')
    .hasAncestor(datastore.key(['session', id]))

  const lines = (await datastore.runQuery(query))[0].map(parse(datastore))

  const questions = await findById(datastore, ['question'])(
    lines.map(x => x.id)
  )

  return lines
    .map(x => ({
      ...x,
      question: questions.find(u => u.id == x.id),
    }))
    .filter(x => x.question)
}

export const user = async ({ userId }) => ({ id: userId })
