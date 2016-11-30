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
  owner: User
  location: Location
  people: [User]
  createdAt: String
  updatedAt: String
}

type Location {
  id: ID!
  name: String!
  quotes: [Quote]
  createdAt: String
  updatedAt: String
}

type Quote {
  id: ID!
  phrases: [Phrase]
  location: Location
  owner: User
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
  images: [Image]
}

input UserInput {
  username: String!
  displayName: String
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

input FileInput {
  name: String!
  type: String!
}

input ImageInput {
  id: String!
  url: String
  caption: String
  location: String
  people: [String]!
}

type Mutation {
  signup(user: UserInput!): User
  login(user: UserInput!): User
  logout: User
  getSignedUrl(filename: String!, filetype: String!): String
  getSignedUrls(files: [FileInput]!): [String]
  updateProfilePicture(url: String!): Image
  createLocation(location: LocationInput!): Location
  createQuote(quote: QuoteInput!): Quote
  createImages(urls: [String]!): [Image]
  updateImage(image: ImageInput!): Image
}
`;
