export const schema = gql`
  type Image {
    id: Int!
    createdAt: DateTime!
    imageId: String!
    url: String!
    postId: Int!
    Post: [Post]!
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
  }

  input CreateImageInput {
    imageId: String!
    url: String!
    postId: Int!
  }

  input UpdateImageInput {
    imageId: String
    url: String
    postId: Int
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth
  }
`
