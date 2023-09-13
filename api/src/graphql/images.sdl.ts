export const schema = gql`
  type Image {
    id: Int!
    createdAt: DateTime!
    imageId: String!
    url: String!
    title: String
    description: String
    postId: Int!
    Post: [Post]!
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
  }

  input CreateImageInput {
    id: Int
    imageId: String!
    url: String!
  }

  input UpdateImageInput {
    id: Int
    imageId: String
    url: String
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth
  }
`
