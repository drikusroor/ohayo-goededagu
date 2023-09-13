export const schema = gql`
  type UserAction {
    id: Int!
    createdAt: DateTime!
    user: User!
    userId: Int!
    action: UserActionType!
    target: String
    targetId: String
  }

  enum UserActionType {
    LOGIN
  }

  type Query {
    userActions: [UserAction!]! @requireAuth(roles: ["ADMIN", "MODERATOR"])
    userAction(id: Int!): UserAction @requireAuth(roles: ["ADMIN", "MODERATOR"])
  }

  input CreateUserActionInput {
    userId: Int!
    action: UserActionType!
    target: String
    targetId: String
  }

  type Mutation {
    createUserAction(input: CreateUserActionInput!): UserAction! @requireAuth
    deleteUserAction(id: Int!): UserAction!
      @requireAuth(roles: ["ADMIN", "MODERATOR"])
  }
`
