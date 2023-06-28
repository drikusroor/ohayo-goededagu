export const schema = gql`
  type Profile {
    id: Int!
    bio: String
    user: User!
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    avatar: String
    name: String
    japaneseName: String
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: Int!): Profile @requireAuth
    profileSelf: Profile @requireAuth
  }

  input CreateProfileInput {
    bio: String
    avatar: String
    name: String
    japaneseName: String
  }

  input UpdateProfileInput {
    bio: String
    avatar: String
    name: String
    japaneseName: String
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(input: UpdateProfileInput!): Profile! @requireAuth
    deleteProfile(id: Int!): Profile! @requireAuth
  }
`
