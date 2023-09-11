export const schema = gql`
  type Post {
    id: Int!
    title: String!
    body: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    published: Boolean!
    type: String!
    videoPost: VideoPost
    coverImage: Image
    location: String
    imageGalleries: [ImageGalleryOnPost]!
  }

  type Query {
    adminPosts: [Post!]! @requireAuth(roles: ["ADMIN"])
    allPosts: [Post!]! @skipAuth
    adminPost(id: Int!): Post @requireAuth(roles: ["ADMIN"])
  }

  input CreatePostInput {
    title: String!
    body: String
    published: Boolean
    type: String!
    videoPost: CreateVideoPostInput
    coverImage: CreateImageInput
    location: String
    imageGalleries: [UpsertImageGalleryOnCreatePostInput]
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
    type: String
    videoPost: CreateVideoPostInput
    coverImage: CreateImageInput
    location: String
    imageGalleries: [UpsertImageGalleryOnCreatePostInput]
  }

  input UpsertImageGalleryOnCreatePostInput {
    id: Int
    imageGalleryId: Int
    images: [CreateImageInput]
    name: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
      @requireAuth(roles: ["ADMIN", "MODERATOR"])
    updatePost(id: Int!, input: UpdatePostInput!): Post!
      @requireAuth(roles: ["ADMIN", "MODERATOR"])
    deletePost(id: Int!): Post! @requireAuth(roles: ["ADMIN", "MODERATOR"])
  }
`
