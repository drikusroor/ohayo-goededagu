export const schema = gql`
  type ImageGalleryOnPost {
    id: Int!
    createdAt: DateTime!
    imageGalleryId: Int!
    imageGallery: ImageGallery!
    postId: Int!
    post: Post!
  }

  type Query {
    imageGalleryOnPosts: [ImageGalleryOnPost!]! @requireAuth
    imageGalleryOnPost(id: Int!): ImageGalleryOnPost @requireAuth
  }

  input CreateImageGalleryOnPostInput {
    imageGalleryId: Int!
    postId: Int!
  }

  input UpdateImageGalleryOnPostInput {
    imageGalleryId: Int
    postId: Int
  }

  type Mutation {
    createImageGalleryOnPost(
      input: CreateImageGalleryOnPostInput!
    ): ImageGalleryOnPost! @requireAuth
    updateImageGalleryOnPost(
      id: Int!
      input: UpdateImageGalleryOnPostInput!
    ): ImageGalleryOnPost! @requireAuth
    deleteImageGalleryOnPost(id: Int!): ImageGalleryOnPost! @requireAuth
  }
`
