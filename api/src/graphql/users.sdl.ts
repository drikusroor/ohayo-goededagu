export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    posts: [Post]!
    profile: Profile
    roles: [Role!]!
    lastLoginAt: DateTime
  }

  type UserWithHashedPassword {
    id: Int!
    email: String!
    name: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    posts: [Post]!
    profile: Profile
    roles: [Role!]!
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

  input UpdateUserPasswordInput {
    currentPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }

  type Mutation {
    updateUserProfile(input: UpdateUserProfileInput!): User! @requireAuth
    updateUserRoles(input: UpdateUserRolesInput!): User!
      @requireAuth(roles: ["ADMIN", "MODERATOR"])
    updateUserPassword(
      input: UpdateUserPasswordInput!
    ): UserWithHashedPassword! @requireAuth
    emailUser: User! @requireAuth
  }

  enum Role {
    ADMIN
    MODERATOR
    USER
    GUEST
  }
`
