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
    usersWithRoles(roles: [Role!]!): [User!]! @requireAuth
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

  input UpdateUserRolesInput {
    id: Int!
    roles: [Role!]!
  }

  input UpdateUserProfileInput {
    name: String
  }

  type Mutation {
    updateUserProfile(input: UpdateUserProfileInput!): User! @requireAuth
    updateUserRoles(id: Int!, input: UpdateUserRolesInput!): User!
      @requireAuth(roles: ["ADMIN", "MODERATOR"])
  }

  enum Role {
    ADMIN
    MODERATOR
    USER
    GUEST
  }
`
