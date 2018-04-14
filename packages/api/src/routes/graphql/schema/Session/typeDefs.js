export const typeDefs = `
  
type SessionLine {
  question: Question!
  date_answered: Date
  answer: Boolean
}
  
type Session {
  id: ID!
  user: User!,
  lines: [SessionLine]!
  
  date_created: Date!
}
`
