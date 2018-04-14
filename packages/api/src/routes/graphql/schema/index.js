import { makeExecutableSchema } from 'graphql-tools'

import Date from './Date/resolvers'
import * as User from './User/resolvers'
import * as Session from './Session/resolvers'
import * as Query from './_Query/resolvers'
// import * as Mutation from './_Mutation/resolvers'

const typeDefs = [
  require('./Date/typeDefs'),
  // require('./User/typeDefs'),
  require('./User/typeDefs'),
  require('./Session/typeDefs'),
  require('./Question/typeDefs'),
  require('./_Query/typeDefs'),
  // require('./_Mutation/typeDefs'),
].map(({ typeDefs }) => typeDefs)

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Date,
    User,
    Query,
    Session,
    // Mutation,
  },
})
