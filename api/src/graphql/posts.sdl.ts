export const schema = gql`
  type Post {
    id: Int!
    title: String!
    titleEn: String
    body: String
    bodyEn: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    published: Boolean!
    type: String!
    comments: [Comment]!
    videoPost: VideoPost
    coverImage: Image
    imageGalleries: [ImageGalleryOnPost]!
    location: String
    postThumbs: [PostThumb]!
  }

  type PostWithPaginationAndFilters {
    posts: [Post!]!
    pagination: Pagination!
    activeFilters: ActiveFilters!
  }

  type Pagination {
    count: Int!
    page: Int!
    perPage: Int!
  }

  type ActiveFilters {
    authors: [Int!]!
    postTypes: [String!]!
    from: DateTime
    to: DateTime
  }

  input QueryPostsInput {
    page: Int
    perPage: Int
    authors: [Int!]
    postTypes: [String!]
    from: DateTime
    to: DateTime
  }

  type Query {
    posts(input: QueryPostsInput): PostWithPaginationAndFilters! @skipAuth
    allPosts: [Post!]! @skipAuth
    post(id: Int!): Post @skipAuth
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
