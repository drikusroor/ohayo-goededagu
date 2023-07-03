export const schema = gql`
  type Post {
    id: Int!
    title: String!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    published: Boolean!
    type: String!
    videoPost: VideoPost
  }

  type Query {
    adminPosts: [Post!]! @requireAuth(roles: ["ADMIN"])
    adminPost(id: Int!): Post @requireAuth(roles: ["ADMIN"])
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean
    type: String!
    videoPost: CreateVideoPostInput
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
    type: String
    videoPost: CreateVideoPostInput
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth(roles: ["ADMIN"])
    updatePost(id: Int!, input: UpdatePostInput!): Post!
      @requireAuth(roles: ["ADMIN"])
    deletePost(id: Int!): Post! @requireAuth(roles: ["ADMIN"])
  }
`
