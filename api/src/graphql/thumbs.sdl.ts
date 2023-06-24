export const schema = gql`
  type Thumb {
    id: Int!
    createdAt: DateTime!
    user: User!
    userId: Int!
    comment: Comment!
    commentId: Int!
    up: Boolean!
  }

  type Query {
    thumbs: [Thumb!]! @requireAuth
    thumb(id: Int!): Thumb @requireAuth
  }

  input CreateThumbInput {
    userId: Int!
    commentId: Int!
    up: Boolean!
  }

  input UpdateThumbInput {
    userId: Int
    commentId: Int
    up: Boolean
  }

  type Mutation {
    createThumb(input: CreateThumbInput!): Thumb! @requireAuth
    updateThumb(id: Int!, input: UpdateThumbInput!): Thumb! @requireAuth
    deleteThumb(id: Int!): Thumb! @requireAuth
  }
`
