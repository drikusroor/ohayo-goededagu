export const schema = gql`
  type Profile {
    id: Int!
    bio: String
    user: User!
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    avatar: String
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: Int!): Profile @requireAuth
  }

  input CreateProfileInput {
    bio: String
    userId: Int!
    avatar: String
  }

  input UpdateProfileInput {
    bio: String
    userId: Int
    avatar: String
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(id: Int!, input: UpdateProfileInput!): Profile! @requireAuth
    deleteProfile(id: Int!): Profile! @requireAuth
  }
`
