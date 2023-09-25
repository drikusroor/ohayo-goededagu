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
    FORGOT_PASSWORD
    SIGNUP
  }

  type Query {
    userActions(orderBy: UserActionOrderByInput): [UserAction!]!
      @requireAuth(roles: ["ADMIN", "MODERATOR"])
    userAction(id: Int!): UserAction @requireAuth(roles: ["ADMIN", "MODERATOR"])
  }

  enum SortOrder {
    asc
    desc
  }

  input UserActionOrderByInput {
    createdAt: SortOrder
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
