export default `
type User {
  id: ID!
  username: String!
}

type Location {
  id: ID!
  name: String!
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
  userById(id: String!): User
  locations: [Location]
  locationById(id: String!): Location
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
