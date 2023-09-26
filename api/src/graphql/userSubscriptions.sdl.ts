export const schema = gql`
  type UserSubscription {
    id: Int!
    createdAt: DateTime!
    user: User!
    userId: Int!
    type: UserSubscriptionType!
    target: Int!
  }

  enum UserSubscriptionType {
    POST_AUTHOR
    POST_TYPE
    COMMENT
  }

  type Query {
    userSubscriptions: [UserSubscription!]! @requireAuth
    userSubscription(id: Int!): UserSubscription @requireAuth
  }

  input CreateUserSubscriptionInput {
    userId: Int!
    type: UserSubscriptionType!
    target: Int!
  }

  input UpdateUserSubscriptionInput {
    userId: Int
    type: UserSubscriptionType
    target: Int
  }

  type Mutation {
    createUserSubscription(
      input: CreateUserSubscriptionInput!
    ): UserSubscription! @requireAuth
    updateUserSubscription(
      id: Int!
      input: UpdateUserSubscriptionInput!
    ): UserSubscription! @requireAuth
    deleteUserSubscription(id: Int!): UserSubscription! @requireAuth
  }
`
