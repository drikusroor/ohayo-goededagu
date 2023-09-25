export const schema = gql`
  type ImageGalleryImage {
    id: Int!
    createdAt: DateTime!
    imageId: String!
    url: String!
    alt: String
    description: String
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
    alt: String
    description: String
  }

  input UpdateImageGalleryImageInput {
    imageId: String
    url: String
    imageGalleryId: Int
    alt: String
    description: String
  }

  type Mutation {
    createImageGalleryImage(
      input: CreateImageGalleryImageInput!
    ): ImageGalleryImage! @requireAuth
    updateImageGalleryImage(
      id: Int!
      input: UpdateImageGalleryImageInput!
    ): ImageGalleryImage! @requireAuth
    addImageGalleryImagesToImageGallery(
      id: Int!
      images: [CreateImageGalleryImageInput!]!
    ): [ImageGalleryImage!]! @requireAuth
    deleteImageGalleryImage(id: Int!): ImageGalleryImage! @requireAuth
  }
`
