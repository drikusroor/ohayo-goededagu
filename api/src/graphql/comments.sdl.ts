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
    postId: Int!
    parentId: Int
  }

  input UpdateCommentInput {
    body: String
    userId: Int
    postId: Int
    parentId: Int
  }

  input DeleteCommentInput {
    id: Int!
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
      @requireAuth(roles: ["ADMIN", "MODERATOR", "USER"])
    updateComment(id: Int!, input: UpdateCommentInput!): Comment!
      @requireAuth(roles: ["ADMIN", "MODERATOR", "USER"])
    deleteComment(id: Int!): Comment!
      @requireAuth(roles: ["ADMIN", "MODERATOR", "USER"])
  }
`
