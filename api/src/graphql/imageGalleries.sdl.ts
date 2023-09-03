export const schema = gql`
  type ImageGallery {
    id: Int!
    createdAt: DateTime!
    imageId: String!
    url: String!
    ImageGalleryOnPost: [ImageGalleryOnPost]!
  }

  type Query {
    imageGalleries: [ImageGallery!]! @requireAuth
    imageGallery(id: Int!): ImageGallery @requireAuth
  }

  input CreateImageGalleryInput {
    imageId: String!
    url: String!
  }

  input UpdateImageGalleryInput {
    imageId: String
    url: String
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
