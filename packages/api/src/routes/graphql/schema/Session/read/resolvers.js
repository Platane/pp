import { parse } from '~/service/gcpDatastore/parse'
import { findById } from '~/service/gcpDatastore/query'

export const session = async (_, { id }, { datastore }) =>
  (await findById(datastore, ['session'])([id]))[0]
