import { parse } from '~/service/gcpDatastore/parse'

export const questions = async (_, __, { datastore }) => {
  const query = datastore.createQuery('question')

  const [questions] = await datastore.runQuery(query)

  return questions.map(parse(datastore))
}
