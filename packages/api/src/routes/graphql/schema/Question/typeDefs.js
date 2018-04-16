export const typeDefs = `
  
enum Category {
  metrics
  business_model
  go_to_market
  funding
  team
}
  
type Question {
  id: ID!
  text: String!
  category: Category!
}
`
