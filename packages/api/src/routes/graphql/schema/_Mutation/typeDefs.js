const u = [
  //
  require('../User/mutation/typeDefs'),
  require('../Session/mutation/typeDefs'),
  require('../SubmitedQuestion/mutation/typeDefs'),
]

export const typeDefs = `
  ${u.map(({ typeDefs }) => typeDefs).join('\n\n')}

  type Mutation {
    ${u.map(({ signatures }) => signatures).join('\n\n')}
  }
`
