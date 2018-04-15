const u = [require('../Session/mutation/typeDefs')]

export const typeDefs = `
  ${u.map(({ typeDefs }) => typeDefs).join('\n\n')}

  type Mutation {
    ${u.map(({ signatures }) => signatures).join('\n\n')}
  }
`
