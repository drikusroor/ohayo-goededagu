export const schema = gql`
  type ImageGallery {
    id: Int!
    createdAt: DateTime!
    ImageGalleryOnPost: [ImageGalleryOnPost]!
    images: [ImageGalleryImage]!
    name: String
    description: String
  }

  type Query {
    imageGalleries: [ImageGallery!]! @requireAuth
    imageGallery(id: Int!): ImageGallery @requireAuth
  }

  input CreateImageGalleryInput {
    name: String
    description: String
  }

  input UpdateImageGalleryInput {
    name: String
    description: String
  }

  type Mutation {
    createImageGallery(input: CreateImageGalleryInput!): ImageGallery!
      @requireAuth
    updateImageGallery(
      id: Int!
      input: UpdateImageGalleryInput!
    ): ImageGallery! @requireAuth
    deleteImageGallery(id: Int!): ImageGallery! @requireAuth
  }
`
