export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    # hashedPassword: String!
    # salt: String!
    # resetToken: String
    # resetTokenExpiresAt: DateTime
    posts: [Post]!
    profile: Profile
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    name: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserProfileInput {
    name: String
  }

  type Mutation {
    updateUserProfile(input: UpdateUserProfileInput!): User! @requireAuth
  }
`
