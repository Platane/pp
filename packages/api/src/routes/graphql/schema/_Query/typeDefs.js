export const typeDefs = `

  type Query {
    questions: [Question]
    user(id:String): User
    session(id:String): Session
  }
`
