import { parse } from '~/service/gcpDatastore/parse'

export const sessions = async ({ id }, _, { datastore }) => {
  const query = datastore.createQuery('session').filter('userId', '=', id)

  const [sessions] = await datastore.runQuery(query)

  return sessions.map(parse(datastore))
}
