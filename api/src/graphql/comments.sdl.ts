export const schema = gql`
  type Comment {
    id: Int!
    body: String!
    createdAt: DateTime!
    user: User!
    userId: Int!
    post: Post!
    postId: Int!
    parent: Comment
    parentId: Int
    children: [Comment]!
    thumbs: [Thumb]!
    deleted: Boolean!
  }

  type Query {
    comments: [Comment!]! @requireAuth
    comment(id: Int!): Comment @requireAuth
  }

  input CreateCommentInput {
    body: String!
    userId: Int!
    postId: Int!
    parentId: Int
    deleted: Boolean!
  }

  input UpdateCommentInput {
    body: String
    userId: Int
    postId: Int
    parentId: Int
    deleted: Boolean
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
