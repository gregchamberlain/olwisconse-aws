export default `
type User {
  id: ID!
  profilePicture: Image
  username: String!
  displayName: String!
  quotes: [Quote]
}

type Image {
  id: ID!
  url: String!
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
  createdAt: String
  updatedAt: String
}

type Phrase {
  sentence: String!
  person: User!
}

type Query {
  currentUser: User
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
  login(user: UserInput!): User
  logout: User
  updateProfilePicture(url: String): Image
  createLocation(location: LocationInput!): Location
  createQuote(quote: QuoteInput!): Quote
}
`;
