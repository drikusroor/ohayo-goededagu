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
    japaneseName: String
    bio: String
    avatar: String
  }

  input UpdateUserPasswordInput {
    currentPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }

  type Mutation {
    deleteUser(id: Int!): User! @requireAuth(roles: ["ADMIN", "MODERATOR"])
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    updateUserProfile(input: UpdateUserProfileInput!): User! @requireAuth
    updateUserRoles(input: UpdateUserRolesInput!): User!
      @requireAuth(roles: ["ADMIN", "MODERATOR"])
    updateUserPassword(
      input: UpdateUserPasswordInput!
    ): UserWithHashedPassword! @requireAuth
    updateUserPasswordByAdmin(
      id: Int!
      newPassword: String!
      superAdminCode: String!
    ): User! @requireAuth(roles: ["ADMIN"])
    emailUser: User! @requireAuth
  }

  enum Role {
    ADMIN
    MODERATOR
    USER
    GUEST
  }
`
