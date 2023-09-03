export const schema = gql`
  type ImageGalleryImage {
    id: Int!
    createdAt: DateTime!
    imageId: String!
    url: String!
    imageGalleryId: Int!
    imageGallery: ImageGallery!
  }

  type Query {
    imageGalleryImages: [ImageGalleryImage!]! @requireAuth
    imageGalleryImage(id: Int!): ImageGalleryImage @requireAuth
  }

  input CreateImageGalleryImageInput {
    imageId: String!
    url: String!
    imageGalleryId: Int!
  }

  input UpdateImageGalleryImageInput {
    imageId: String
    url: String
    imageGalleryId: Int
  }

  type Mutation {
    createImageGalleryImage(
      input: CreateImageGalleryImageInput!
    ): ImageGalleryImage! @requireAuth
    updateImageGalleryImage(
      id: Int!
      input: UpdateImageGalleryImageInput!
    ): ImageGalleryImage! @requireAuth
    deleteImageGalleryImage(id: Int!): ImageGalleryImage! @requireAuth
  }
`
