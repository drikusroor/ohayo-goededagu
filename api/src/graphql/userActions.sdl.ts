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
    userActions: [UserAction!]! @requireAuth
    userAction(id: Int!): UserAction @requireAuth
  }

  input CreateUserActionInput {
    userId: Int!
    action: UserActionType!
    target: String
    targetId: String
  }

  input UpdateUserActionInput {
    userId: Int
    action: UserActionType
    target: String
    targetId: String
  }

  type Mutation {
    createUserAction(input: CreateUserActionInput!): UserAction! @requireAuth
    updateUserAction(id: Int!, input: UpdateUserActionInput!): UserAction!
      @requireAuth
    deleteUserAction(id: Int!): UserAction! @requireAuth
  }
`
