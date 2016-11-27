export default `
type User {
  id: ID!
  username: String!
}

type Location {
  id: ID!
  name: String!
}

type Query {
  users: [User]
  locations: [Location]
}

input UserInput {
  username: String!
  password: String!
}

input LocationInput {
  name: String!
}

type Mutation {
  signup(user: UserInput!): User
  createLocation(location: LocationInput!): Location
}
`;
