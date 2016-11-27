export default `
type User {
  id: ID!
  username: String!
  quotes: [Quote]
}

type Location {
  id: ID!
  name: String!
  quotes: [Quote]
}

type Quote {
  id: ID!
  phrases: [Phrase]
  location: Location
}

type Phrase {
  sentence: String!
  person: User!
}

type Query {
  users: [User]
  user(username: String!): User
  locations: [Location]
  location(id: String!): Location
  quotes: [Quote]
}

input UserInput {
  username: String!
  password: String!
}

input LocationInput {
  name: String!
}

input PhraseInput {
  sentence: String!
  person: String!
}

input QuoteInput {
  phrases: [PhraseInput]
  location: String
}

type Mutation {
  signup(user: UserInput!): User
  createLocation(location: LocationInput!): Location
  createQuote(quote: QuoteInput!): Quote
}
`;
