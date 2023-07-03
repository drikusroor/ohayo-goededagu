export const schema = gql`
  type VideoPost {
    id: Int!
    post: Post!
    postId: Int!
    videoUrl: String!
  }

  type Query {
    videoPosts: [VideoPost!]! @requireAuth
    videoPost(id: Int!): VideoPost @requireAuth
  }

  input CreateVideoPostInput {
    videoUrl: String!
  }

  input UpdateVideoPostInput {
    videoUrl: String
  }

  type Mutation {
    createVideoPost(input: CreateVideoPostInput!): VideoPost! @requireAuth
    updateVideoPost(id: Int!, input: UpdateVideoPostInput!): VideoPost!
      @requireAuth
    deleteVideoPost(id: Int!): VideoPost! @requireAuth
  }
`
